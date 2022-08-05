import * as React from 'react';

import type { RadioChangeHandler } from '../Radio';


/* --------
 * Internal Type
 * -------- */
export type UseRadioValueReturn<V> = [ V | undefined, RadioChangeHandler, React.Dispatch<React.SetStateAction<V | undefined>> ];


/**
 * Use this hook to get automatically the input value
 * and the handler function to attach to input.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useRadioValue<V extends (string | number)>(initialValue?: V): UseRadioValueReturn<V> {

  // ----
  // Internal State
  // ----
  const [ radioValue, setRadioValue ] = React.useState<V | undefined>(initialValue);


  // ----
  // Handler
  // ----
  const handleRadioChange = React.useCallback<RadioChangeHandler>(
    (e, props) => {
      /** Set new value */
      setRadioValue(props.value as V | undefined);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ radioValue, handleRadioChange, setRadioValue ];

}
