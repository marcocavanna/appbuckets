import * as React from 'react';

import { RxTableColumnProps } from '../RxTable.types';


/* --------
 * Internal Types
 * -------- */
export interface UseColumnsConfig<Data> {
  /** Columns Array */
  columns: RxTableColumnProps<Data>[];

  /** Set if data will be selectable */
  selectable?: boolean;

  /** Select Column Props */
  selectColumnProps?: Partial<Pick<RxTableColumnProps<Data>, 'className' | 'headerClassName' | 'key' | 'textAlign'>>

  /** The entire table width */
  width: number;
}


export interface Columns<Data> {
  /** Arranged Columns */
  columns: RxTableColumnProps<Data>[];

  /** Columns width object */
  columnsWidth: Record<string, number>;

  /** The effective table width */
  effectiveTableWidth: number;

  /** Get single column width */
  getWidth: (key: string) => number;

  /** The total columns width */
  totalColumnsWidth: number;
}


export default function useColumns<Data>(config: UseColumnsConfig<Data>): Columns<Data> {

  const {
    columns: userDefinedColumns,
    selectable,
    selectColumnProps,
    width: tableWidth
  } = config;


  // ----
  // Update Columns Field using Selectable
  // ----
  const columns: RxTableColumnProps<Data>[] = React.useMemo(
    () => {
      /** If table isn't selectable, return columns */
      if (!selectable) {
        return userDefinedColumns;
      }

      /** Return Columns width Select Column Props and Default */
      return [
        {
          key  : '%%selectable%%',
          width: 50,
          ...selectColumnProps
        },
        ...userDefinedColumns
      ];
    },
    [ userDefinedColumns, selectable, selectColumnProps ]
  );


  // ----
  // Compute the effective Columns Width
  // ----
  const columnsWidth: Record<string, number> = React.useMemo(
    () => {
      /** Build the Columns Container */
      const widths: Record<string, number> = {};

      /** Get the fixed used space */
      const availableFlexibleSpace = tableWidth - columns
        .filter((column) => (
          typeof column.width === 'number' && (!column.widthType || column.widthType === 'fixed')
        ))
        .reduce<number>((total, next) => total + (next.width as number), 0);

      /** Get total available spacing for auto column */
      let autoFlexibleSpace = availableFlexibleSpace;

      /** Loop each column to build width */
      columns
        .filter((column) => typeof column.width === 'number')
        .forEach((column) => {
          /** Calc percentage space */
          if (column.widthType === 'percentage') {
            const columnWidth = Math.max(
              0,
              Math.round((availableFlexibleSpace / 100) * (column.width as number))
            );
            widths[column.key] = columnWidth;
            autoFlexibleSpace -= columnWidth;
            return;
          }

          /** Return the user defined width */
          widths[column.key] = Math.round(column.width as number);
        });

      const autoSizingColumns = columns.filter((column) => (
        column.width === 'auto' || column.width === undefined
      ));

      /** Get the maximum grow factor */
      const totalGrowFactor = autoSizingColumns.reduce<number>((max, { growFactor }) => (
        max + Math.max(1, (growFactor ?? 1))
      ), 0);

      /** Compute the Auto Sizing Columns */
      autoSizingColumns
        .forEach((column) => {
          /** Divide the spacing equally */
          widths[column.key] = Math.round((autoFlexibleSpace / totalGrowFactor) * Math.max(
            1,
            (column.growFactor ?? 1)
          ));
        });

      return widths;
    },
    [ columns, tableWidth ]
  );


  // ----
  // Save the Total Columns Width
  // ----
  const totalColumnsWidth = React.useMemo(
    (): number => (
      Object
        .keys(columnsWidth)
        .reduce<number>(((totalWidth, nextKey) => (totalWidth + columnsWidth[nextKey])), 0)
    ),
    [ columnsWidth ]
  );


  // ----
  // Save the max width using tableWidth and totalColumnsWidth
  // ----
  const effectiveTableWidth = Math.max(tableWidth, totalColumnsWidth);


  // ----
  // Build a function the retrieve the exact columnWidth
  // ----
  const getColumnWidth = React.useCallback(
    (key: string) => {
      /** Check if is last column */
      const isLast = columns[columns.length - 1].key === key;

      /** If is not last then return its declared width */
      if (!isLast) {
        return columnsWidth[key] ?? 0;
      }

      /** Else, return the remain width */
      const restColumnsWidth = Object.keys(columnsWidth).reduce<number>((totalWidth, nextKey) => (
        nextKey === key
          ? totalWidth
          : totalWidth + (columnsWidth[nextKey])
      ), 0);

      return effectiveTableWidth - restColumnsWidth;
    },
    [ columnsWidth, columns, effectiveTableWidth ]
  );


  // ----
  // Return Tools
  // ----
  return {
    columns,
    columnsWidth,
    effectiveTableWidth,
    totalColumnsWidth,
    getWidth: getColumnWidth
  };
}
