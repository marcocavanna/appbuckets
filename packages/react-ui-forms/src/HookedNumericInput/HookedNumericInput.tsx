import * as React from 'react';

import NumericInput, { NumericInputProps } from '@appbuckets/react-ui/NumericInput';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookedNumericInputValueType = number | null;
export type HookedNumericInputProps = HookedFieldProps<NumericInputProps, HookedNumericInputValueType>;


/* --------
 * Component Definition
 * -------- */
const HookedNumericInput = createHookedField<NumericInputProps, HTMLInputElement, HookedNumericInputValueType>({

  displayName: 'HookedNumericInput',

  Component: function HookedNumericInputComponent(props) {

    const {
      innerRef,
      meta,
      rest
    } = props;

    return (
      <NumericInput
        {...rest}
        {...meta.appearance}
        ref={innerRef}
        hint={meta.message}
      />
    );
  },

  parseValue: ({ props }) => props?.value ?? null

});

export default HookedNumericInput;
