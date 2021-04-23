import * as React from 'react';

import MultiSelect, { MultiSelectProps } from '@appbuckets/react-ui/MultiSelect';
import { SelectOption, SelectDefaultOption } from '@appbuckets/react-ui/Select';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


type HookedMultiSelectType = null | (string | number)[];
export type HookedMultiSelectProps<Option extends SelectOption = SelectDefaultOption> =
  HookedFieldProps<MultiSelectProps<Option>, HookedMultiSelectType>;


/* --------
 * Component Definition
 * -------- */
const HookedMultiSelectInner = createHookedField<MultiSelectProps<any>, any, HookedMultiSelectType>({

  displayName: 'HookedMultiSelect',

  Component: (props) => {

    const {
      rest,
      meta
    } = props;

    return (
      <MultiSelect
        {...rest}
        {...meta.appearance}
        hint={meta.message}
      />
    );
  },

  parseValue: ({ props }) => props?.value ?? null

});

function HookedMultiSelect<Option extends SelectOption = SelectDefaultOption>(props: HookedMultiSelectProps<Option>) {
  return (
    <HookedMultiSelectInner {...props} />
  );
}

export default HookedMultiSelect;
