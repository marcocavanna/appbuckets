import * as React from 'react';

import { RxTableColumnProps } from '../RxTable.types';


/* --------
 * Internal Types
 * -------- */
export interface UseDataFiltering<Data> {
  /** Columns Array */
  columns: RxTableColumnProps<Data>[];

  /** The filter logic to apply */
  filterLogic?: 'and' | 'or';
}

type UseDataFilteringAndData<Data> = UseDataFiltering<Data> & {
  /** Data to filter */
  data: Data[];
};

export interface DataFiltered<Data> {
  /** Filtered Data */
  filteredData: Data[];

  /** Current filters */
  filters: Record<string, any>;

  /** Set filter at column */
  setFilter: (columnKey: string, value: any) => void;
}


/* --------
 * Hook Definition
 * -------- */
export default function useDataFiltering<Data>(
  enabled: boolean,
  config: UseDataFilteringAndData<Data>
): DataFiltered<Data> {

  const {
    columns,
    data,
    filterLogic
  } = config;


  // ----
  // Internal State
  // ----
  const [ filters, setFilteringValues ] = React.useState<Record<string, any>>(
    columns.reduce<Record<string, any>>(
      (acc, column) => {
        if (column.filter) {
          acc[column.key] = column.filter.initialValue;
        }

        return acc;
      },
      {}
    )
  );


  // ----
  // Handlers
  // ----
  const setFilter = React.useCallback(
    (columnKey: string, value: any) => {
      setFilteringValues((curr) => ({
        ...curr,
        [columnKey]: value
      }));
    },
    [ setFilteringValues ]
  );


  // ----
  // Filtering Data
  // ----
  const filteredData = React.useMemo<Data[]>(
    () => {
      /** If no filter, return entire data */
      if (!enabled) {
        return data;
      }

      /** Init a regexp pool to save regexp once per time */
      const regExpPool: Record<string, RegExp> = {};

      /** Get only filter columns */
      const filterColumns = columns.filter((column) => {
        if (!column.filter) {
          return false;
        }

        if (column.filter.type === 'input') {
          return typeof filters[column.key] === 'string' && !!filters[column.key].length;
        }

        if (column.filter.type === 'regexp') {
          /** Get current value */
          const value = filters[column.key];

          /** If is invalid, abort */
          if (typeof value !== 'string' || !value.length) {
            return false;
          }

          /** If value is valid, save the regexp into pool */
          regExpPool[column.key] = new RegExp(
            value
              .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
              .replace(/-/g, '\\x2d'),
            column.filter.flags || 'ig'
          );

          return true;
        }

        if (column.filter.type === 'checkbox') {
          return typeof filters[column.key] === 'boolean' && !!filters[column.key];
        }

        if (column.filter.type === 'select') {
          return filters[column.key] !== null && filters[column.key] !== undefined;
        }

        if (column.filter.type === 'multi-select') {
          return Array.isArray(filters[column.key]) && filters[column.key].length > 0;
        }

        return false;
      });

      /** If no columns are able to filter data, return entire data set */
      if (!filterColumns.length) {
        return data;
      }

      /** Filter data using columns */
      return data.filter((row, index, array) => {
        return filterColumns.reduce(
          (show: boolean, next: RxTableColumnProps<Data>) => {
            /** Assert filter realy exists */
            if (!next.filter) {
              return show;
            }

            /** Get the filter show value */
            const couldShowNext = next.filter.type === 'regexp'
              ? !!regExpPool[next.key] ? next.filter.show(regExpPool[next.key], row, index, array) : true
              : next.filter.show(filters[next.key] as (string & number), row, index, array);

            /** Concatenate result */
            return filterLogic === 'and'
              ? show && couldShowNext
              : show || couldShowNext;
          },
          filterLogic === 'and'
        );
      });
    },
    [
      columns,
      data,
      filterLogic,
      filters,
      enabled
    ]
  );


  // ----
  // Return tools
  // ----
  return {
    filteredData,
    filters,
    setFilter
  };

}
