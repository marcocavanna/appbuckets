import * as React from 'react';

import Checkbox, { CheckboxProps } from '@appbuckets/react-ui/Checkbox';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookedCheckboxValueType = boolean;
export type HookedCheckboxProps = HookedFieldProps<CheckboxProps, HookedCheckboxValueType>;


/* --------
 * Component Definition
 * -------- */
const HookedCheckbox = createHookedField<CheckboxProps, HTMLInputElement, HookedCheckboxValueType>({

  displayName: 'HookedCheckbox',

  Component: function HookedCheckboxComponent(props) {

    const {
      innerRef,
      meta,
      rest: {
        onChange,
        value,
        ...rest
      }
    } = props;

    return (
      <Checkbox
        {...rest}
        {...meta.appearance}
        ref={innerRef}
        checked={!!value}
        hint={meta.message}
        onClick={onChange}
      />
    );
  },

  parseValue: ({ props }) => {
    /** Get checked props */
    const { checked } = props || {};

    return !!checked;
  },

  formatValue: (value) => !!value

});

export default HookedCheckbox;
