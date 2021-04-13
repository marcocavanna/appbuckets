import * as React from 'react';
import invariant from 'tiny-invariant';

import { areEqualStringArray } from '../../utils';


/* --------
 * Internal Interface
 * -------- */
export interface UseDataSelectorConfig<Data> {
  /** A default selected data */
  defaultSelectedData?: Data[];

  /** Get row Key Function */
  getRowKey: keyof Data | ((row: Data, index: number, array: Data[]) => React.Key);

  /** An handler to call when selected data change */
  onSelectedDataChange?: (selected: Data[]) => void;

  /** Set if selector is disabled */
  selectable?: boolean;
}

type UserDataSelectorConfigAndData<Data> = UseDataSelectorConfig<Data> & {
  /** All Data List */
  allData: Data[];

  /** Filtered Data Slice */
  filteredData: Data[];
};


/* --------
 * Hook Return Type
 * -------- */
export interface DataSelector<Data> {
  /** Check if all rows are selected */
  areAllRowsSelected: boolean;

  /** Deselect all rows */
  deselectAllRows: () => void;

  /** Deselect one or more rows */
  deselectRow: (...rows: Data[]) => void;

  /** Get the key of a row */
  getRowKey: (row: Data, index: number, array: Data[]) => React.Key;

  /** Check if a row is selected */
  isRowSelected: (row: Data) => boolean;

  /** Select all rows */
  selectAllRows: () => void;

  /** Count of selected rows */
  selectedCount: number;

  /** Selected Data Array */
  selectedData: Data[];

  /** Select one or more rows */
  selectRow: (...rows: Data[]) => void;

  /** Toggle a row */
  toggleSelectRow: (row: Data) => void;
}


/* --------
 * Main Hook Definition
 * -------- */
export default function useDataSelector<Data>(
  config: UserDataSelectorConfigAndData<Data>
): DataSelector<Data> {

  const {
    allData,
    filteredData,
    selectable,
    defaultSelectedData,
    getRowKey: userDefinedGetRowKey,
    onSelectedDataChange
  } = config;


  // ----
  // Memoize the RowKey extractor
  // ----
  const getRowKey = React.useCallback(
    (row: Data, index: number, array: Data[]): React.Key => {
      if (typeof userDefinedGetRowKey === 'function') {
        return userDefinedGetRowKey(row, index, array);
      }

      if (typeof userDefinedGetRowKey === 'string') {
        return row[userDefinedGetRowKey as keyof Data] as any as React.Key;
      }

      return '';
    },
    [ userDefinedGetRowKey ]
  );


  // ----
  // Invariant Check selectable and getRowKey
  // ----
  if (process.env.NODE_ENV === 'development' && selectable) {
    invariant(
      typeof getRowKey === 'function',
      'To correctly use selectable table the getRowKey'
      + 'function must be declared'
    );
  }


  // ----
  // Build a Map with all data keys
  // ----
  const dataKeys: Map<Data, React.Key> = React.useMemo(
    () => {
      /** Build a new Map to save all data keys */
      const keys = new Map<Data, React.Key>();

      /** Loop each row and get it's own key */
      allData.forEach((row, index, array) => {
        keys.set(row, getRowKey(row, index, array));
      });

      return keys;
    },
    [ allData, getRowKey ]
  );

  const filteredDataKeys: Map<Data, React.Key> = React.useMemo(
    () => {
      /** Build a new Map to save all data keys */
      const keys = new Map<Data, React.Key>();

      /** Loop filtered data only and save key */
      filteredData.forEach((row) => {
        /** Get key from dataKeys */
        const key = dataKeys.get(row);
        /** If exists, push into keys */
        if (key !== undefined) {
          keys.set(row, key);
        }
      });

      return keys;
    },
    [ dataKeys, filteredData ]
  );


  // ----
  // Initialize Internal State to keep tracking of Selected Keys
  // ----
  const [ selectedKeys, setSelectedKeys ] = React.useState<React.Key[]>(
    defaultSelectedData && selectable
      ? (
        defaultSelectedData
          .filter((row) => dataKeys.has(row))
          .map((row) => dataKeys.get(row) as React.Key)
      )
      : []
  );


  // ----
  // Internal Helpers
  // ----
  const getSelectedData = React.useCallback(
    (currentSelected: React.Key[] = selectedKeys) => (
      allData.filter((row) => {
        /** Get the row key */
        const key = dataKeys.get(row);
        /** Return key exists and is included into selectedKeys */
        return key !== undefined && currentSelected.includes(key);
      })
    ),
    [ allData, dataKeys, selectedKeys ]
  );


  // ----
  // Handlers
  // ----
  const handleSelectedDataChange = React.useCallback(
    (currentSelected?: React.Key[]) => {
      if (typeof onSelectedDataChange === 'function') {
        onSelectedDataChange(getSelectedData(currentSelected));
      }
    },
    [ getSelectedData, onSelectedDataChange ]
  );


  // ----
  // Public Helpers
  // ----
  const isRowSelected = React.useCallback(
    (rowToCheck: Data) => {
      /** Get the row key */
      const key = dataKeys.get(rowToCheck);
      /** Check if is selected */
      return key !== undefined && selectedKeys.includes(key);
    },
    [ dataKeys, selectedKeys ]
  );

  const selectAllRows = React.useCallback(
    () => {
      /** Build an array of new Selected item using all keys */
      const newSelected: React.Key[] = [
        ...new Set<React.Key>([
          ...selectedKeys,
          ...Array.from(filteredDataKeys.values())
        ])
      ];
      /** Update the state */
      setSelectedKeys(() => {
        handleSelectedDataChange(newSelected);
        return newSelected;
      });
    },
    [ filteredDataKeys, selectedKeys, handleSelectedDataChange ]
  );

  const deselectAllRows = React.useCallback(
    () => {
      /** Build a new empty array of selected keys */
      const newSelected: React.Key[] = [];
      /** Update the state */
      setSelectedKeys(() => {
        handleSelectedDataChange(newSelected);
        return newSelected;
      });
    },
    [ handleSelectedDataChange ]
  );

  const selectRow = React.useCallback(
    (...rows: Data[]) => {
      /** Transform rows into a React.Key array */
      const rowsKey = rows
        .map((row) => dataKeys.get(row))
        .filter((key) => (
          key !== undefined && !selectedKeys.includes(key)
        )) as React.Key[];

      if (rowsKey.length) {
        const newSelected = [ ...selectedKeys, ...rowsKey ];
        setSelectedKeys(() => {
          handleSelectedDataChange(newSelected);
          return newSelected;
        });
      }
    },
    [ dataKeys, handleSelectedDataChange, selectedKeys ]
  );

  const deselectRow = React.useCallback(
    (...rows: Data[]) => {
      /** Transform rows into a React.Key array */
      const rowsKey = rows
        .map((row) => dataKeys.get(row))
        .filter((key) => (
          key !== undefined && selectedKeys.includes(key)
        )) as React.Key[];

      /** Remove found keys */
      if (rowsKey.length) {
        const newSelected = [ ...selectedKeys ].filter((key) => (
          !rowsKey.includes(key)
        ));
        setSelectedKeys(() => {
          handleSelectedDataChange(newSelected);
          return newSelected;
        });
      }
    },
    [ dataKeys, handleSelectedDataChange, selectedKeys ]
  );

  const toggleSelectRow = React.useCallback(
    (rowToToggle: Data) => {
      if (isRowSelected(rowToToggle)) {
        deselectRow(rowToToggle);
      }
      else {
        selectRow(rowToToggle);
      }
    },
    [ isRowSelected, deselectRow, selectRow ]
  );


  // ----
  // Assert selectedKeys validity on data change
  // ----
  React.useEffect(
    () => {
      /** Avoid is selecting is disabled */
      if (!selectable) {
        return;
      }

      /** Get all selected keys */
      const dataIDs = Array.from(dataKeys.values());

      /** Build a new array of selected keys */
      const newSelected = [ ...selectedKeys ].filter((key) => (
        dataIDs.includes(key)
      ));

      /** If selected data is different, update state */
      if (!areEqualStringArray(newSelected, selectedKeys)) {
        setSelectedKeys(() => {
          handleSelectedDataChange(newSelected);
          return newSelected;
        });
      }
    },
    [ dataKeys, handleSelectedDataChange, selectable, selectedKeys ]
  );


  // ----
  // Return Controller
  // ----
  return {
    areAllRowsSelected: selectedKeys.length === allData.length,
    deselectAllRows,
    deselectRow,
    getRowKey,
    isRowSelected,
    selectAllRows,
    selectedData      : getSelectedData(),
    selectedCount     : selectedKeys.length,
    selectRow,
    toggleSelectRow
  };

}
