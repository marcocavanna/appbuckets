import * as React from 'react';


/* --------
 * Internal Types
 * -------- */
export interface UseDataLoadConfig<Data> {
  /** Data to load */
  data: Data[] | ((timestamp: number) => (Data[] | Promise<Data[]>));

  /** Default data to use on init */
  defaultData?: Data[];

  /** Default loading state */
  defaultLoading?: boolean;

  /** Dependency to use to reload data */
  reloadDependency?: any;

  /** Reload data silently */
  reloadSilently?: boolean;
}


/* --------
 * Internal States
 * -------- */
interface DataState<Data> {
  /** Current Data */
  data: Data[];

  /** Data load error */
  error: any;

  /** Loading State */
  loading: boolean;

  /** The last data load timestamp */
  lastReloadTimeStamp: number;

  /** Number of reload */
  reloadCount: number;
}


/* --------
 * Hook Definition
 * -------- */
export default function useDataLoad<Data>(config: UseDataLoadConfig<Data>): DataState<Data> {

  const {
    data,
    defaultData,
    defaultLoading,
    reloadDependency,
    reloadSilently
  } = config;


  // ----
  // Build internal state
  // ----
  const [ dataState, setDataState ] = React.useState<DataState<Data>>({
    data               : Array.isArray(data) ? data : (defaultData ?? []),
    error              : null,
    loading            : defaultLoading ?? typeof data === 'function',
    lastReloadTimeStamp: 0,
    reloadCount        : 0
  });


  // ----
  // Build the Load Data Function
  // ----
  const loadData = React.useCallback(
    async () => {

      /**
       * If data is a plain a plain
       * array object then there is no
       * need to wait for data load
       */
      if (Array.isArray(data)) {
        setDataState((curr) => ({
          data,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now(),
          reloadCount        : curr.reloadCount + 1
        }));
        return;
      }

      /**
       * If data loading is a function then
       * must set the loading state and wait
       * for data load.
       * Data load is typical async than must
       * set the loading state if the reload
       * is not silent. A silent reload will
       * reload table data without changing loading state
       */
      if (!dataState.loading && !reloadSilently) {
        setDataState((curr) => ({
          ...curr,
          loading: true
        }));
      }

      /** Try to load data */
      try {
        /** Await the function result */
        const result = await data(Date.now());

        setDataState((curr) => ({
          data               : result,
          loading            : false,
          error              : null,
          lastReloadTimeStamp: Date.now(),
          reloadCount        : curr.reloadCount + 1
        }));
      }
      catch (error) {
        setDataState((curr) => ({
          data               : [],
          loading            : false,
          error,
          lastReloadTimeStamp: Date.now(),
          reloadCount        : curr.reloadCount + 1
        }));
      }
    },
    [
      data,
      dataState.loading,
      reloadSilently
    ]
  );


  // ----
  // Build the Load/Reload of Data
  // ----
  React.useEffect(
    () => {
      loadData();
    },
    [ loadData, reloadDependency ]
  );


  // ----
  // Return the Data State
  // ----
  return dataState;

}
