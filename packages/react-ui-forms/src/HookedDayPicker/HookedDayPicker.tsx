import * as React from 'react';

import DayPicker, { DayPickerProps } from '@appbuckets/react-ui/DayPicker';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookedDayPickerValueType = number | null;
export type HookedDayPickerProps = HookedFieldProps<DayPickerProps, HookedDayPickerValueType>;


/* --------
 * Component Definition
 * -------- */
const HookedDayPicker = createHookedField<DayPickerProps, null, HookedDayPickerValueType>({

  displayName: 'HookedDayPicker',

  Component: function HookedDayPickerComponent(props) {

    const {
      rest: {
        value,
        onChange,
        onDayChange: userDefinedOnDayChangeHandler,
        timestamp,
        ...rest
      },
      meta
    } = props;

    // ----
    // Internal Day Change Handler
    // ----
    const handleDayChange = React.useCallback(
      (nothing: null, dayPickerProps: DayPickerProps) => {
        /** Call the internal on change function */
        onChange(nothing, dayPickerProps);
        /** Call user defined handler if exists */
        if (typeof userDefinedOnDayChangeHandler === 'function') {
          userDefinedOnDayChangeHandler(nothing, dayPickerProps);
        }
      },
      [ onChange, userDefinedOnDayChangeHandler ]
    );


    return (
      <DayPicker
        {...rest}
        {...meta.appearance}
        date={value}
        hint={meta.message}
        onDayChange={handleDayChange}
      />
    );
  },

  parseValue: ({ props }) => props?.timestamp || null

});

export default HookedDayPicker;
