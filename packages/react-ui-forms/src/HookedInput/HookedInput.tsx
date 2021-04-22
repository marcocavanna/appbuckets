import * as React from 'react';

import Input, { InputProps } from '@appbuckets/react-ui/Input';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookedInputValueType = string | number | null;
export type HookedInputProps = HookedFieldProps<InputProps, HookedInputValueType>;


/* --------
 * Component Definition
 * -------- */
const HookedInput = createHookedField<InputProps, HTMLInputElement, HookedInputValueType, string>({

  displayName: 'HookedInput',

  Component: function HookedInputComponent(props) {

    const {
      innerRef,
      meta,
      rest
    } = props;

    return (
      <Input
        {...rest}
        {...meta.appearance}
        ref={innerRef}
        hint={meta.message}
      />
    );
  },

  parseValue: ({ props }) => {
    /** Get value and type */
    const { value, type = 'text' } = props || {};

    /** If value is undefined, return null */
    if (value === undefined || value === null) {
      return null;
    }

    /** If type is a number, cast value */
    if (type === 'number') {
      const casted = value === '' ? null : Number(value);

      if (value === null || Number.isNaN(casted)) {
        return null;
      }

      return casted;
    }

    /** Return the value as string */
    return value;
  },

  formatValue: (value) => {
    /** Return a string as is */
    if (typeof value === 'string') {
      return value;
    }
    /** Convert number to string */
    if (typeof value === 'number') {
      return value.toString();
    }
    /** Fallback to empty string */
    return '';
  }

});

export default HookedInput;
