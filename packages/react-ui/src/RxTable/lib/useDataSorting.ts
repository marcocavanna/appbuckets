import * as React from 'react';
import arraySort from 'array-sort';

import { useAutoControlledValue } from '../../hooks/useAutoControlledValue';
import { areEqualStringArray } from '../../utils';


/* --------
 * Internal Types
 * -------- */
export interface UseDataSortingConfig {
  /** Set initial reverse sorting */
  defaultReverseSorting?: boolean;

  /** Set initial sort */
  defaultSort?: string[];

  /** Callback handler fired when sort is changing */
  onSortChange?: (sorting: string[], reverse: boolean) => void;

  /** Manual control reverse sorting */
  reverseSorting?: boolean;

  /** Manual control sorting */
  sort?: string[];
}

type UseDataSortingConfigAndData<Data> = UseDataSortingConfig & {
  /** Data to sort */
  data: Data[];
};


export interface DataSorted<Data> {
  /** Is actual sorting reversed */
  isSortReversed: boolean;

  /** Handler to change sorting */
  setSorting: (newSorting: string[], reverse: boolean) => void;

  /** Sorted Data */
  sortedData: Data[];

  /** Applied Sorting */
  sorting: string[];
}


/* --------
 * Hook definition
 * -------- */
export default function useDataSorting<Data>(config: UseDataSortingConfigAndData<Data>): DataSorted<Data> {

  const {
    data,
    defaultReverseSorting,
    defaultSort,
    onSortChange,
    reverseSorting,
    sort
  } = config;


  // ----
  // Define internal State
  // ----
  const [ sorting, trySetSorting ] = useAutoControlledValue([], {
    defaultProp: defaultSort,
    prop       : sort
  });

  const [ isSortReversed, trySetReverseSorting ] = useAutoControlledValue(false, {
    defaultProp: defaultReverseSorting,
    prop       : reverseSorting
  });


  // ----
  // Handlers
  // ----
  const handleChangeSorting = React.useCallback(
    (newSorting: string[], reverse: boolean) => {
      /** Check if sorting is changed */
      const isSortChanged = !areEqualStringArray(sorting, newSorting);
      const isReversingChanged = reverse !== isSortReversed;

      /** If no change, return */
      if (!isSortChanged && !isReversingChanged) {
        return;
      }

      /** Call user defined handler */
      if (onSortChange) {
        onSortChange(newSorting, reverse);
      }

      /** Try to set new Sorting */
      if (isSortChanged) {
        trySetSorting(newSorting);
      }

      if (reverse !== isSortReversed) {
        trySetReverseSorting(reverse);
      }
    },
    [ onSortChange, isSortReversed, sorting, trySetReverseSorting, trySetSorting ]
  );


  // ----
  // Memoized Sorted Data
  // ----
  const sortedData = React.useMemo<Data[]>(
    () => {
      if (sorting.length) {
        return arraySort(data, sorting, { reverse: isSortReversed });
      }

      return data;
    },
    [ data, isSortReversed, sorting ]
  );


  // ----
  // Return Data and handler
  // ----
  return {
    sortedData,
    setSorting: handleChangeSorting,
    isSortReversed,
    sorting
  };

}
