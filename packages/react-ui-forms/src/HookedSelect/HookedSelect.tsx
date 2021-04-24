import * as React from 'react';

import Select, { SelectProps, SelectOption, SelectDefaultOption } from '@appbuckets/react-ui/Select';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookeSelectValueType = string | number | null;
export type HookedSelectProps<Option extends SelectOption = SelectDefaultOption> =
  HookedFieldProps<SelectProps<Option>, HookeSelectValueType>;


/* --------
 * Component Definition
 * -------- */
const HookedSelectInner = createHookedField<SelectProps<any>, undefined, HookeSelectValueType>({

  displayName: 'HookedSelect',

  Component: (props) => {

    const {
      rest,
      meta
    } = props;

    return (
      <Select
        {...rest}
        {...meta.appearance}
        hint={meta.message}
      />
    );
  },

  parseValue: ({ props }) => props?.value ?? null

});

function HookedSelect<Option extends SelectOption = SelectDefaultOption>(props: HookedSelectProps<Option>) {
  const { ref, ...rest } = props;
  return (
    <HookedSelectInner {...rest} />
  );
}

export default HookedSelect;
