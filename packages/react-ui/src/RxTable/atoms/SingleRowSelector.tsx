import * as React from 'react';

import Checkbox from '../../Checkbox';

import { useRxTable } from '../RxTable.context';


/* --------
 * Component Interfaces
 * -------- */
export interface SingleRowSelectorProps<Data> {
  /** The row to select */
  row: Data;
}


/* --------
 * Component Definition
 * -------- */
const SingleRowSelector: React.FunctionComponent<SingleRowSelectorProps<unknown>> = (
  props
) => {

  /** Get the Row */
  const { row } = props;


  // ----
  // Get Context Props
  // ----
  const {
    selection: {
      isRowSelected,
      toggleSelectRow
    }
  } = useRxTable();


  // ----
  // Handlers
  // ----
  const handleToggleRow = React.useCallback(
    () => {
      toggleSelectRow(row);
    },
    [ toggleSelectRow, row ]
  );


  // ----
  // Checkbox Render as a Memoized Component
  // ----
  return React.useMemo(
    () => (
      <Checkbox
        checked={isRowSelected(row)}
        onClick={handleToggleRow}
      />
    ),
    [ isRowSelected, handleToggleRow, row ]
  );
};

SingleRowSelector.displayName = 'SingleRowSelector';

export default SingleRowSelector;
