import * as React from 'react';
import clsx from 'clsx';

import { areEqualStringArray } from '../../utils';

import { useRxTable } from '../RxTable.context';
import { RxTableColumnProps } from '../RxTable.types';


/* --------
 * Component Interfaces
 * -------- */
export interface ColumnHeaderProps {
  /** Additional ClassName */
  className?: string;

  /** The column object */
  column: RxTableColumnProps<unknown>;

  /** Disable sorting for this cell, also if is enabled */
  disableSorting?: boolean;

  /** This column header is demanded to render filter element */
  isFilterHeader: boolean;

  /** Override column content */
  overrideContent?: React.ReactNode;
}


/* --------
 * Component Definition
 * -------- */
const ColumnHeader: React.FunctionComponent<ColumnHeaderProps> = (props) => {

  const {
    className,
    column,
    disableSorting,
    isFilterHeader,
    overrideContent
  } = props;


  // ----
  // Get Context Data
  // ----
  const {
    classes,
    Components: {
      HeaderCell
    },
    columns   : {
      getWidth: getColumnWidth
    },
    layout    : { isVirtualized },
    sorting   : {
      current   : currentSorting,
      set       : setSorting,
      isReversed: isSortReversed
    },
    styles
  } = useRxTable();


  // ----
  // Get Column Sort Property
  // ----
  const columnSort = React.useMemo(
    (): { isSortable: boolean, isSorted: boolean } => {
      const isSortable = Array.isArray(column.sort) && !!column.sort.length && !disableSorting && !isFilterHeader;

      return {
        isSortable,
        isSorted: isSortable && areEqualStringArray(currentSorting, column.sort!)
      };
    },
    [ column.sort, currentSorting, disableSorting, isFilterHeader ]
  );


  // ----
  // Build Header Classes
  // ----
  const headerClasses = clsx(
    column.textAlign && `has-text-${column.textAlign}`,
    className,
    column.headerClassName,
    isFilterHeader ? classes.FilterCell || classes.HeaderCell : classes.HeaderCell,
    isFilterHeader && 'filter'
  );


  // ----
  // Handlers
  // ----
  const handleSortChange = React.useCallback(
    () => {
      if (!columnSort.isSortable) {
        return;
      }

      if (columnSort.isSorted) {
        setSorting(column.sort!, !isSortReversed);
      }
      else {
        setSorting(column.sort!, false);
      }
    },
    [
      column.sort,
      isSortReversed,
      setSorting,
      columnSort.isSortable,
      columnSort.isSorted
    ]
  );


  // ----
  // Get Column Width
  // ----
  const columnWidth = React.useMemo(
    () => getColumnWidth(column.key),
    [ getColumnWidth, column.key ]
  );


  // ----
  // Render the Component
  // ----
  return (
    <HeaderCell
      className={headerClasses}
      column={column}
      content={column.header}
      hasSorting={columnSort.isSortable}
      isActualSortingColumn={columnSort.isSorted}
      isReversedSorting={columnSort.isSorted && isSortReversed}
      isVirtualized={isVirtualized}
      style={{
        ...(isFilterHeader ? styles.FilterCell || styles.HeaderCell : styles.HeaderCell),
        flexBasis: columnWidth,
        width    : columnWidth
      }}
      onClick={columnSort.isSortable ? handleSortChange : undefined}
    >
      {overrideContent}
    </HeaderCell>
  );
};

ColumnHeader.displayName = 'ColumnHeader';

export default ColumnHeader;
