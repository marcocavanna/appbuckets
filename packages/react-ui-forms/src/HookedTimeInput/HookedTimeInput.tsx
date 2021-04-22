import * as React from 'react';

import Input, { InputProps } from '@appbuckets/react-ui/Input';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookedTimeInputValueType = number | null;
export type HookedTimeInputProps = HookedFieldProps<InputProps, HookedTimeInputValueType>;


/* --------
 * Component Definition
 * -------- */
const HookedTimeInput = createHookedField<InputProps, HTMLInputElement, HookedTimeInputValueType, string>({

  displayName: 'HookedTimeInput',

  Component: function HookedTimeInputComponent(props) {

    const {
      meta,
      rest
    } = props;

    return (
      <Input
        {...rest}
        {...meta.appearance}
        hint={meta.message}
        type={'time'}
      />
    );

  },

  parseValue: ({ props }) => {
    if (typeof props?.value !== 'string' || !props.value.length) {
      return null;
    }

    const [ hours, minutes ] = props.value.split(':').map(value => Number(value));

    return ((Number.isNaN(hours) ? 0 : hours) * 3_600_000) + ((Number.isNaN(minutes) ? 0 : minutes) * 60_000);
  },

  formatValue: (value) => {
    if (typeof value !== 'number') {
      return '';
    }

    if (value === 0) {
      return '00:00';
    }

    const minutes = (value % 3600000) / 60000;
    const hours = Math.trunc((value - minutes) / 3600000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

});

export default HookedTimeInput;
