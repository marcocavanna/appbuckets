import clsx from 'clsx';
import * as React from 'react';

import { useRxTable } from '../RxTable.context';

import { RxTableColumnProps, RxTableCellProps } from '../RxTable.types';


/* --------
 * Component Interfaces
 * -------- */
export interface CellProps<Data> {
  /** Defined ClassName */
  className?: string;

  /** The column object */
  column: RxTableColumnProps<Data>;

  /** Override column content */
  overrideContent?: React.ReactNode;

  /** The current row */
  row: Data;

  /** The current row index */
  rowIndex: number;
}


/* --------
 * Component Definition
 * -------- */
const Cell: React.FunctionComponent<CellProps<unknown>> = (props) => {

  const {
    className,
    column,
    overrideContent,
    row,
    rowIndex
  } = props;


  // ----
  // Get Context Props
  // ----
  const {
    classes,
    Components: {
      BodyCell
    },
    columns   : {
      getWidth: getColumnWidth
    },
    layout    : {
      isVirtualized
    },
    styles,
    tableData
  } = useRxTable();


  // ----
  // Build Cell Classes
  // ----
  const cellClasses = clsx(
    column.textAlign && `has-text-${column.textAlign}`,
    className,
    column.className,
    classes.BodyCell
  );


  // ----
  // Get Column Width
  // ----
  const columnWidth = React.useMemo(
    () => getColumnWidth(column.key),
    [ getColumnWidth, column.key ]
  );


  // ----
  // Prebuild BodyCell Props
  // ----
  const bodyCellProps: RxTableCellProps<unknown> = {
    className: cellClasses,
    column,
    isVirtualized,
    row,
    rowIndex,
    style    : {
      ...styles.BodyCell,
      width    : columnWidth,
      flexBasis: columnWidth
    },
    tableData
  };


  // ----
  // If an overridden Content exists, use it to render the Cell
  // ----
  if (overrideContent) {
    return (
      <BodyCell {...bodyCellProps}>
        {overrideContent}
      </BodyCell>
    );
  }


  // ----
  // Render the Body Cell
  // ----
  return (
    <BodyCell {...bodyCellProps} />
  );
};

Cell.displayName = 'Cell';

export default Cell;
