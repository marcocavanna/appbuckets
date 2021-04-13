import * as React from 'react';

import { AnyObject } from '../generic';

import useColumns, { UseColumnsConfig } from './lib/useColumns';
import useDataFiltering, { UseDataFiltering } from './lib/useDataFiltering';
import useDataLoad, { UseDataLoadConfig } from './lib/useDataLoad';
import useDataSelector, { DataSelector, UseDataSelectorConfig } from './lib/useDataSelector';
import useDataSorting, { UseDataSortingConfig } from './lib/useDataSorting';

import { RxTableColumnProps, RxTableComponents } from './RxTable.types';


/* --------
 * Internal Types
 * -------- */
type RxTableComponentClasses = Partial<Record<keyof RxTableComponents<any> | 'FilterCell' | 'FilterRow', string>>;
type RxTableComponentStyles = Partial<Record<keyof RxTableComponents<any> | 'FilterCell' | 'FilterRow', React.CSSProperties>>;


/* --------
 * Table Factory Configuration
 * -------- */
export type UseRxTableFactoryConfig<Data> =
  & UseColumnsConfig<Data>
  & UseDataFiltering<Data>
  & UseDataLoadConfig<Data>
  & UseDataSelectorConfig<Data>
  & UseDataSortingConfig
  & { onRowClick?: (row: Data, index: number, array: Data[]) => void; }
  & { isVirtualized?: boolean }
  & { classes?: RxTableComponentClasses }
  & { styles?: RxTableComponentStyles };


/* --------
 * Table Factory Tools
 * -------- */
export interface RxTableFactory<Data> {
  /** User defined classes */
  classes: RxTableComponentClasses;

  /** All loaded data */
  data: Data[];

  /** Only filtered and sorted data */
  tableData: Data[];

  /** Current data state */
  dataState: {
    /** Data load error */
    error: any;
    /** Data is currently loading */
    isLoading: boolean;
  },

  /** Columns Descriptor */
  columns: {
    /** Current table columns */
    current: RxTableColumnProps<Data>[];
    /** Get column width by key */
    getWidth: (key: string) => number;
    /** The width of the columns indexed by key */
    width: Record<string, number>;
  };

  /** Data filters */
  filter: {
    /** Current filters */
    current: Record<string, any>;
    /** Set column filter by key */
    set: (column: string, value: any) => void;
  };

  /** Interaction handler */
  interaction: {
    /** Check if row click is enabled */
    isRowClickEnabled: boolean;
    /** Row Click Handler */
    handleRowClick: (index: number) => void;
  },

  /** Table Layout Props */
  layout: {
    /** The effective table width */
    effectiveTableWidth: number;
    /** Table has filter row */
    hasFilterRow: boolean;
    /** Table has the Footer Row */
    hasFooterRow: boolean;
    /** Table has header row */
    hasHeaderRow: boolean;
    /** Check if table is virtualized */
    isVirtualized: boolean;
    /** The total columns width */
    totalColumnsWidth: number;
  };

  /** Data selection */
  selection: DataSelector<Data> & { enabled: boolean };

  /** Sort controller */
  sorting: {
    /** Current sorting */
    current: string[];
    /** Check if is reversed */
    isReversed: boolean;
    /** Set new sorting */
    set: (fields: string[], reverse: boolean) => void;
  };

  /** User defined styles */
  styles: RxTableComponentStyles;
}


/* --------
 * Hook Definition
 * -------- */
export function useRxTableFactory<Data extends AnyObject = any>(
  config: UseRxTableFactoryConfig<Data>
): RxTableFactory<Data> {


  // ----
  // Code Destructuring
  // ----
  const {
    classes,
    columns: userDefinedColumns,
    data,
    defaultData,
    defaultLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedDefaultSelectedData,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    getRowKey: userDefinedGetRowKey,
    isVirtualized,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting: userDefinedReverseSorting,
    selectable,
    selectColumnProps,
    sort: userDefinedSort,
    styles,
    width
  } = config;


  // ----
  // Checker Builder
  // ----
  const hasFilterRow = React.useMemo<boolean>(
    () => userDefinedColumns.some((column) => !!column.filter),
    [ userDefinedColumns ]
  );

  const hasFooterRow = React.useMemo<boolean>(
    () => userDefinedColumns.some((column) => !!column.footer),
    [ userDefinedColumns ]
  );

  const hasHeaderRow = React.useMemo<boolean>(
    () => userDefinedColumns.some((column) => !!column.header),
    [ userDefinedColumns ]
  );


  // ----
  // Compute effective column and table widths
  // ----
  const {
    columns,
    columnsWidth,
    effectiveTableWidth,
    getWidth,
    totalColumnsWidth
  } = useColumns({
    columns: userDefinedColumns,
    selectable,
    selectColumnProps,
    width
  });


  // ----
  // Data Management and Load
  // ----
  const dataState = useDataLoad({
    data,
    defaultData,
    defaultLoading,
    reloadDependency,
    reloadSilently
  });


  // ----
  // Data Filtering
  // ----
  const {
    filteredData,
    filters,
    setFilter
  } = useDataFiltering(hasFilterRow, {
    columns,
    data: dataState.data,
    filterLogic
  });


  // ----
  // Enable Data Selector Hook
  // ----
  const dataSelector = useDataSelector({
    allData            : dataState.data,
    filteredData,
    defaultSelectedData: userDefinedDefaultSelectedData,
    selectable         : !!selectable && dataState.reloadCount > 0,
    getRowKey          : userDefinedGetRowKey,
    onSelectedDataChange
  });


  // ----
  // Sorting Controller
  // ----
  const {
    isSortReversed,
    setSorting,
    sorting,
    sortedData
  } = useDataSorting({
    data                 : filteredData,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSort          : userDefinedDefaultSort,
    onSortChange,
    reverseSorting       : userDefinedReverseSorting,
    sort                 : userDefinedSort
  });


  // ----
  // Internal Handlers
  // ----
  const handleRowClick = React.useCallback(
    (index: number) => {
      if (onRowClick) {
        onRowClick(sortedData[index], index, sortedData);
      }
    },
    [ onRowClick, sortedData ]
  );


  return {

    data: dataState.data,

    tableData: sortedData,

    dataState: {
      error    : dataState.error,
      isLoading: dataState.loading
    },

    classes: classes ?? {},

    columns: {
      current: columns,
      getWidth,
      width  : columnsWidth
    },

    filter: {
      current: filters,
      set    : setFilter
    },

    interaction: {
      isRowClickEnabled: typeof onRowClick === 'function',
      handleRowClick
    },

    layout: {
      effectiveTableWidth,
      hasFilterRow,
      hasFooterRow,
      hasHeaderRow,
      isVirtualized: !!isVirtualized,
      totalColumnsWidth
    },

    selection: {
      ...dataSelector,
      enabled: !!selectable && dataState.reloadCount > 0
    },

    sorting: {
      current   : sorting,
      isReversed: isSortReversed,
      set       : setSorting
    },

    styles: styles ?? {}

  };
}
