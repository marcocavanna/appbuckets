import * as React from 'react';

import type { NumericInputChangeHandler } from '../NumericInput';


/* --------
 * Internal Type
 * -------- */
export type UseNumericInputValueReturn = [
  (number | null),
  NumericInputChangeHandler,
  React.Dispatch<React.SetStateAction<number | null>>
];


/**
 * Use this hook to get automatically the numeric input value
 * and the handler function to attach to numeric input.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useNumericInputValue(initialValue?: number | null): UseNumericInputValueReturn {

  // ----
  // Internal State
  // ----
  const [ numericInputValue, setNumericInputValue ] = React.useState<number | null>(initialValue ?? null);


  // ----
  // Handler
  // ----
  const handleInputChange = React.useCallback<NumericInputChangeHandler>(
    (e, props) => {
      /** Set new value */
      setNumericInputValue(props.value ?? null);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ numericInputValue, handleInputChange, setNumericInputValue ];

}
