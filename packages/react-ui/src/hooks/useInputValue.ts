import * as React from 'react';

import type { InputChangeHandler } from '../Input';


/* --------
 * Internal Type
 * -------- */
export type UseInputValueReturn = [ string, InputChangeHandler, React.Dispatch<React.SetStateAction<string>> ];


/**
 * Use this hook to get automatically the input value
 * and the handler function to attach to input.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useInputValue(initialValue?: string | null): UseInputValueReturn {

  // ----
  // Internal State
  // ----
  const [ inputValue, setInputValue ] = React.useState<string>(initialValue ?? '');


  // ----
  // Handler
  // ----
  const handleInputChange = React.useCallback<InputChangeHandler>(
    (e, props) => {
      /** Get the value */
      const { value } = props;

      /** Set new value */
      setInputValue(value ?? '');
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ inputValue, handleInputChange, setInputValue ];

}
