import * as React from 'react';

import type { CheckboxChangeHandler } from '../Checkbox';


/* --------
 * Internal Type
 * -------- */
export type UseCheckboxValueReturn = [ boolean, CheckboxChangeHandler, React.Dispatch<React.SetStateAction<boolean>> ];


/**
 * Use this hook to get automatically the checkbox value
 * and the handler function to attach to checkbox.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useCheckboxValue(initialValue?: boolean | null): UseCheckboxValueReturn {

  // ----
  // Internal State
  // ----
  const [ checked, setChecked ] = React.useState<boolean>(!!initialValue);


  // ----
  // Handler
  // ----
  const handleCheckboxChange = React.useCallback<CheckboxChangeHandler>(
    (e, props) => {
      /** Update the value */
      setChecked(!!props.checked);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ checked, handleCheckboxChange, setChecked ];

}
