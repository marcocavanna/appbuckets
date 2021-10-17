import * as React from 'react';

import MultiSelect from '@appbuckets/react-ui/MultiSelect';
import Select from '@appbuckets/react-ui/Select';

import type { SelectOption, SelectProps } from '@appbuckets/react-ui/Select';

import type { ClientRequestConfig, ClientRequestParams } from '@appbuckets/react-app-client';


/* --------
 * Internal Types
 * -------- */
type Selector = typeof MultiSelect | typeof Select;

type DemandedProps =
  | 'Selector'
  | 'displayName'
  | 'getOptionLabel'
  | 'getOptionValue'
  | 'noOptionsMessage'
  | 'placeholder';

type PlainOrBuilder<T, OptionType, ValueType, Props, HookResult> =
  T
  | ((props: Omit<BuildSelectorConfiguration<OptionType, ValueType, Props, HookResult>, DemandedProps>) => T);


/* --------
 * Public Configuration for withSelector HOC
 * -------- */
export interface BuildSelectorConfiguration<OptionType extends SelectOption, ValueType, Props, HookResult>
  extends StrictSelectorProps<OptionType, ValueType, Props, HookResult> {
  /** Selector Default Props */
  // eslint-disable-next-line max-len
  defaultProps?: PlainOrBuilder<Partial<SelectorProps<OptionType, ValueType, Props, HookResult>>, OptionType, ValueType, Props, HookResult>;

  /** Set the Component displayName */
  displayName: string;

  /** Resolves option data to a string to be displayed as the label by components */
  getOptionLabel: (option: OptionType) => string;

  /** Resolves option data to a string to compare options and specify value attributes */
  getOptionValue: (option: OptionType) => string | number;

  /** No Options Message */
  noOptionsMessage?: (data: { inputValue: string }) => string | null;

  /** Override Component Props */
  // eslint-disable-next-line max-len
  overrideProps?: PlainOrBuilder<Partial<SelectorProps<OptionType, ValueType, Props, HookResult>>, OptionType, ValueType, Props, HookResult>;

  /** Default placeholder */
  placeholder?: string;

  /** Request Configuration */
  request?: PlainOrBuilder<ClientRequestParams & ClientRequestConfig, OptionType, ValueType, Props, HookResult>;

  /** Hook function to execute */
  useHook?: () => HookResult;

  /** Set the Component to Use as Selector */
  Selector: Selector;
}


/* --------
 * Exported Props and Component Type
 * -------- */
export type SelectorComponent<OptionType extends SelectOption, ValueType, Props, HookResult> =
  React.FunctionComponent<SelectorProps<OptionType, ValueType, Props, HookResult>>;

export type SelectorProps<OptionType extends SelectOption, ValueType, Props, HookResult> =
  Props
  & StrictSelectorProps<OptionType, ValueType, Props, HookResult>
  & Omit<SelectProps<OptionType, ValueType, ValueType extends any[] ? [] : null>, 'options'>;

export type SelectorOptions<OptionType extends SelectOption, ValueType, Props, HookResult> =
  | OptionType[]
  | ((props: SelectorProps<OptionType, ValueType, Props, HookResult>, hookResult: HookResult) => OptionType[]);


/* --------
 * Internal Props for Selector Component
 * -------- */
interface StrictSelectorProps<OptionType extends SelectOption, ValueType, Props, HookResult> {
  /** Filter data */
  filter?: (data: OptionType, index: number, array: OptionType[]) => boolean;

  /** Manual set selector option */
  options?: SelectorOptions<OptionType, ValueType, Props, HookResult>;

  /** Override Request Configuration */
  requestConfig?: ClientRequestConfig;

  /** Reload Data on Menu Open */
  reloadDataOnMenuOpen?: boolean;

  /** Override the Selector to Use */
  Selector?: Selector;

  /** Sort options */
  sort?: (keyof OptionType | string)[];
}
