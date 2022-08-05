import * as React from 'react';

import type { ColorPickerChangeHandler } from '../ColorPicker';


/* --------
 * Internal Type
 * -------- */
export type UseColorPickerValueReturn = [ string, ColorPickerChangeHandler, React.Dispatch<React.SetStateAction<string>> ];


/**
 * Use this hook to get automatically the color picker value
 * and the handler function to attach to color picker.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useColorPickerValue(initialValue?: string | null): UseColorPickerValueReturn {

  // ----
  // Internal State
  // ----
  const [ colorPickerValue, setColorPickerValue ] = React.useState<string>(initialValue ?? '');


  // ----
  // Handler
  // ----
  const handleColorPickerChange = React.useCallback<ColorPickerChangeHandler>(
    (e, props) => {
      /** Set new value */
      setColorPickerValue(props.color ?? '');
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ colorPickerValue, handleColorPickerChange, setColorPickerValue ];

}
