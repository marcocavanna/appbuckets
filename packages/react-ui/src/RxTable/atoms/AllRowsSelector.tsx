import * as React from 'react';

import Checkbox from '../../Checkbox';

import { useRxTable } from '../RxTable.context';


/* --------
 * Component Interfaces
 * -------- */
export interface AllRowsSelectorProps {

}


/* --------
 * Component Definition
 * -------- */
const AllRowsSelector: React.FunctionComponent<AllRowsSelectorProps> = () => {

  // ----
  // Get data from Context
  // ----
  const {
    selection: {
      areAllRowsSelected,
      selectedCount,
      selectAllRows,
      deselectAllRows
    }
  } = useRxTable();


  // ----
  // Handle Select All Change
  // ----
  const handleSelectCheckboxChange = React.useCallback(
    () => {
      /** If all rows are selected, deselect */
      if (areAllRowsSelected) {
        deselectAllRows();
      }
      /** Else, select all rows */
      else {
        selectAllRows();
      }
    },
    [ areAllRowsSelected, deselectAllRows, selectAllRows ]
  );


  // ----
  // Return the Checkbox as Memoized Component
  // ----
  return React.useMemo(
    () => (
      <Checkbox
        checked={areAllRowsSelected}
        indeterminate={!areAllRowsSelected && selectedCount > 0}
        onClick={handleSelectCheckboxChange}
      />
    ),
    [ areAllRowsSelected, selectedCount, handleSelectCheckboxChange ]
  );
};

AllRowsSelector.displayName = 'AllRowsSelector';

export default AllRowsSelector;
