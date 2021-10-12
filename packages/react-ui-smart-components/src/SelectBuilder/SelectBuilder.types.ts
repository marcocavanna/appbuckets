import * as React from 'react';

import type MultiSelect from '@appbuckets/react-ui/MultiSelect';

import type {
  // eslint-disable-next-line import/no-named-default
  default as Select,
  SelectOption,
  SelectProps
} from '@appbuckets/react-ui/Select';

import type { UseClientRequestConfig } from '@appbuckets/react-app-client';


/* --------
 * Internal Types
 * -------- */
type Selector = typeof MultiSelect | typeof Select;

export type PlainOrBuilder<TOut, OptionType extends SelectOption, ValueType, Props, HookResult> =
  | TOut
  | ((props: SelectorProps<OptionType, ValueType, Props, HookResult>, hookResult: HookResult) => TOut);


/* --------
 * Component
 * -------- */
export interface StrictSelectorProps<OptionType extends SelectOption, ValueType, Props, HookResult>
  extends Omit<SelectProps<OptionType, ValueType, ValueType extends []
    ? []
    : null>, 'options' | 'getOptionLabel' | 'getOptionValue'> {
  /** Filter data */
  filter?: (data: OptionType, index: number, array: OptionType[]) => boolean;

  /** No Options Message */
  noOptionsMessage?: string | ((data: { inputValue: string }) => string | null);

  /** Manual set selector option */
  options?: SelectorOptions<OptionType, ValueType, Props, HookResult>;

  /** Default placeholder */
  placeholder?: string;

  /** Reload Data on Menu Open */
  reloadDataOnMenuOpen?: boolean;

  /** Request Configuration */
  request?: PlainOrBuilder<UseClientRequestConfig, OptionType, ValueType, Props, HookResult>;

  /** Sort options */
  sort?: (keyof OptionType | string)[];
}

export type SelectorProps<OptionType extends SelectOption, ValueType, Props, HookResult> =
  & Props
  & StrictSelectorProps<OptionType, ValueType, Props, HookResult>;

export type SelectorComponent<OptionType extends SelectOption, ValueType, Props, HookResult> =
  React.VFC<SelectorProps<OptionType, ValueType, Props, HookResult>>;

export type SelectorOptions<OptionType extends SelectOption, ValueType, Props, HookResult> =
  PlainOrBuilder<OptionType[], OptionType, ValueType, Props, HookResult>;


/* --------
 * Configuration
 * -------- */
export interface SelectBuilderConfig<OptionType extends SelectOption, ValueType, Props, HookResult>
  extends StrictSelectorProps<OptionType, ValueType, Props, HookResult> {
  /** Selector Default Props */
  // eslint-disable-next-line max-len
  defaultProps?: PlainOrBuilder<Partial<SelectorProps<OptionType, ValueType, Props, HookResult>>, OptionType, ValueType, Props, HookResult>;

  /** Set the Component displayName */
  displayName: string;

  /** Resolves option data to a string to be displayed as the label by components */
  getOptionLabel: keyof OptionType | ((option: OptionType) => string);

  /** Resolves option data to a string to compare options and specify value attributes */
  getOptionValue: keyof OptionType | ((option: OptionType) => string | number);

  /** Override Component Props */
  // eslint-disable-next-line max-len
  overrideProps?: PlainOrBuilder<Partial<SelectorProps<OptionType, ValueType, Props, HookResult>>, OptionType, ValueType, Props, HookResult>;

  /** Hook function to execute */
  useHook?: () => HookResult;

  /** Set the Component to Use as Selector */
  Selector: Selector;
}
