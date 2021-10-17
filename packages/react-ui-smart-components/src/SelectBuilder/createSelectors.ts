import Select from '@appbuckets/react-ui/Select';
import MultiSelect from '@appbuckets/react-ui/MultiSelect';

import HookedSelect from '@appbuckets/react-ui-forms/HookedSelect';
import HookedMultiSelect from '@appbuckets/react-ui-forms/HookedMultiSelect';

import buildSelector from './SelectBuilder';

import { SelectorComponent, SelectBuilderConfig } from './SelectBuilder.types';


export type BuiltSelectors<OptionType, Props, HookResult> = {
  Single: SelectorComponent<OptionType, OptionType, Props, HookResult>,
  Multi: SelectorComponent<OptionType, OptionType[], Props, HookResult>,
  HookedSingle: SelectorComponent<OptionType, OptionType, Props, HookResult>,
  HookedMulti: SelectorComponent<OptionType, OptionType[], Props, HookResult>
};

export default function buildSelectors<OptionType, HookResult = undefined, Props = {}>(
  config: Omit<SelectBuilderConfig<OptionType, OptionType | OptionType[], Props, HookResult>, 'Selector'>
): BuiltSelectors<OptionType, Props, HookResult> {

  return {
    Single      : buildSelector<OptionType, OptionType, Props, HookResult>({
      ...config,
      Selector: Select
    } as SelectBuilderConfig<OptionType, OptionType, Props, HookResult>),
    Multi       : buildSelector<OptionType, OptionType[], Props, HookResult>({
      ...config,
      Selector: MultiSelect
    } as SelectBuilderConfig<OptionType, OptionType[], Props, HookResult>),
    HookedSingle: buildSelector<OptionType, OptionType, Props, HookResult>({
      ...config,
      Selector: HookedSelect
    } as SelectBuilderConfig<OptionType, OptionType, Props, HookResult>),
    HookedMulti : buildSelector<OptionType, OptionType[], Props, HookResult>({
      ...config,
      Selector: HookedMultiSelect
    } as SelectBuilderConfig<OptionType, OptionType[], Props, HookResult>)
  };

}
