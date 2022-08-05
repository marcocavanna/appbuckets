import * as React from 'react';

import type { TabsChangeHandler } from '../Tabs';


/* --------
 * Internal Type
 * -------- */
export type UseTabsChangeReturn = [ number, TabsChangeHandler, React.Dispatch<React.SetStateAction<number>> ];


/**
 * Use this hook to get automatically the active index
 * of a Tab Component.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useTabsChange(initialValue?: number): UseTabsChangeReturn {

  // ----
  // Internal State
  // ----
  const [ activeIndex, setActiveIndex ] = React.useState<number>(initialValue ?? 0);


  // ----
  // Handler
  // ----
  const handleTabsChange = React.useCallback<TabsChangeHandler>(
    (e, props) => {
      /** Set the new ActiveIndex */
      setActiveIndex(props.activeIndex ?? 0);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ activeIndex, handleTabsChange, setActiveIndex ];

}
