import * as React from 'react';

import type { DayPickerChangeHandler } from '../DayPicker';


/* --------
 * Internal Type
 * -------- */
export type UseDayPickerValueReturn = [ Date | null, DayPickerChangeHandler, React.Dispatch<React.SetStateAction<Date | null>> ];


/**
 * Use this hook to get automatically the color picker value
 * and the handler function to attach to color picker.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useDayPickerValue(initialValue?: Date): UseDayPickerValueReturn {

  // ----
  // Internal State
  // ----
  const [ dayPickerValue, setDayPickerValue ] = React.useState<Date | null>(initialValue ?? null);


  // ----
  // Handler
  // ----
  const handleColorPickerChange = React.useCallback<DayPickerChangeHandler>(
    (e, props) => {
      /** If no value, return */
      if (!props.date) {
        setDayPickerValue(null);
        return;
      }

      /** Parse as date */
      return new Date(props.date);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ dayPickerValue, handleColorPickerChange, setDayPickerValue ];

}
