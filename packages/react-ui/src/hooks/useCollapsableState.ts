import * as React from 'react';

import type {
  CollapsableState,
  CollapseStateChangeHandler
} from '../Collapsable';


/* --------
 * Internal Type
 * -------- */
export type UseCollapsableStateReturn = [
  (undefined | CollapsableState),
  CollapseStateChangeHandler,
  React.Dispatch<React.SetStateAction<CollapsableState | undefined>>
];


/**
 * Use this hook to get automatically the open value
 * and the handler function to attach to collapsable element.
 * Additionally function to force change will be returned
 *
 * @param initialState
 */
export function useCollapsableState(initialState?: CollapsableState): UseCollapsableStateReturn {

  // ----
  // Internal State
  // ----
  const [ currentState, setCurrentState ] = React.useState<CollapsableState | undefined>(initialState);


  // ----
  // Handler
  // ----
  const handleCollapsableStateChange = React.useCallback<CollapseStateChangeHandler>(
    (newState) => {
      /** Update the state */
      setCurrentState(newState);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ currentState, handleCollapsableStateChange, setCurrentState ];

}
