import { ReactNode } from 'react';
import * as React from 'react';

import ReactSelect, { ActionMeta } from 'react-select';
import CreatableReactSelect from 'react-select/creatable';

import { SelectComponentsConfig } from 'react-select/src/components';

import { FormatOptionLabelMeta } from 'react-select/src/Select';
import { StylesConfig } from 'react-select/src/styles';
import { ThemeConfig } from 'react-select/src/theme';
import {
  GroupTypeBase,
  KeyboardEventHandler,
  MenuPlacement,
  MenuPosition,
  OptionsType,
  ValueType
} from 'react-select/src/types';

import { AnyObject } from '../generic';
import { StrictFieldProps } from '../Field';


/* --------
 * Define Usable Options
 * -------- */
export type SelectOption = AnyObject;
export type SelectDefaultOption = { label: string, value: string };


/* --------
 * Define Main Props
 * -------- */
export type SelectProps<Option extends SelectOption = SelectDefaultOption, Value = string | number, FallbackValue = null> =
  StrictSelectProps<Option, Value, FallbackValue>
  & StrictFieldProps;


/* --------
 * Define Strict Select Props
 * -------- */
export type MutableReactSelect<Option> = ReactSelect<Option> | CreatableReactSelect<Option>;

export type SelectEventProps<Option extends SelectOption,
  Value = string | number,
  Fallback = null> =
  SelectProps<Option>
  & { action: ActionMeta<Option> | null; inputValue: string; value: Value | Fallback; };

export interface StrictSelectProps<Option extends SelectOption, Value = string | number, FallbackValue = null> {

  /* Aria label (for assistive tech) */
  'aria-label'?: string;

  /** HTML ID of an element that should be used as the label (for assistive tech) */
  'aria-labelledby'?: string;

  /**
   * Allow options to be created while the `isLoading` prop is true.
   * Useful to prevent the "create new ..." option being displayed
   * while async results are still being loaded.
   */
  allowCreateWhileLoading?: boolean;

  /** Focus the control when it is mounted */
  autoFocus?: boolean;

  /** Remove the currently focused option when the user presses backspace */
  backspaceRemovesValue?: boolean;

  /** Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices) */
  blurInputOnSelect?: boolean;

  /** When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
  captureMenuScroll?: boolean;

  /** className attribute applied to the outer component */
  className?: string;

  /** classNamePrefix attribute used as a base for inner component classNames */
  classNamePrefix?: string | null;

  /** Close the select menu when the user selects an option */
  closeMenuOnSelect?: boolean;

  /**
   * If `true`, close the select menu when the user scrolls the document/body.
   *
   * If a function, takes a standard javascript `ScrollEvent` you return a boolean:
   *
   * `true` => The menu closes
   *
   * `false` => The menu stays open
   *
   * This is useful when you have a scrollable modal and want to portal the menu out,
   * but want to avoid graphical issues.
   */
  closeMenuOnScroll?: boolean | EventListener;

  /**
   * This complex object includes all the compositional components that are used
   * in `react-select`. If you wish to overwrite a component, pass in an object
   * with the appropriate namespace.
   *
   * If you only wish to restyle a component, we recommend using the `styles` prop
   * instead. For a list of the components that can be passed in, and the shape
   * that will be passed to them, see [the components docs](/api#components)
   */
  components?: SelectComponentsConfig<Option, FallbackValue extends Array<any> ? true : false, GroupTypeBase<Option>>;

  /** Whether the value of the select, e.g. SingleValue, should be displayed in the control. */
  controlShouldRenderValue?: boolean;

  /** Set the component as a Creatable Select */
  creatable?: boolean;

  /** Default Input Value */
  defaultInputValue?: string;

  /** The default starting select value */
  defaultValue?: Value;

  /** Delimiter used to join multiple values into a single HTML Input value */
  delimiter?: string;

  /** Clear all values when the user presses escape AND the menu is closed */
  escapeClearsValue?: boolean;

  /**
   * Gets the label for the "create new ..."
   * option in the menu. Is given the current input value.
   */
  formatCreateLabel?: (inputValue: string) => React.ReactNode;

  /** Formats group labels in the menu as React components */
  formatGroupLabel?: (group: GroupTypeBase<Option>) => ReactNode;

  /** Formats option labels in the menu and control as React components */
  formatOptionLabel?: (
    option: Option,
    labelMeta: FormatOptionLabelMeta<Option, FallbackValue extends Array<any> ? true : false>
  ) => React.ReactNode;

  /**
   * Used to create the new Option starting from inputValue string
   */
  getNewOptionData?: (inputValue: string) => Option;

  /** Resolves option data to a string to be displayed as the label by components */
  getOptionLabel?: (option: Option) => string;

  /** Resolves option data to a string to compare options and specify value attributes */
  getOptionValue?: (option: Option) => string | number;

  /** Hide the selected option from the menu */
  hideSelectedOptions?: boolean;

  /** The id to set on the SelectContainer component. */
  id?: string;

  /** The value of the search input */
  inputValue?: string;

  /** The id of the search input */
  inputId?: string;

  /** Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string;

  /** Is the select value clearable */
  isClearable?: boolean;

  /** Direct declaration of isMulti props is forbidden, use the Select.Multi component instead */
  isMulti?: never;

  /** Override the built-in logic to detect whether an option is disabled */
  isOptionDisabled?: (option: Option, options: OptionsType<Option>) => boolean | false;

  /** Override the built-in logic to detect whether an option is selected */
  isOptionSelected?: (option: Option, options: OptionsType<Option>) => boolean;

  /** Is the select direction right-to-left */
  isRtl?: boolean;

  /** Whether to enable search functionality */
  isSearchable?: boolean;

  /**
   * Determines whether the "create new ..."
   * option should be displayed based on
   * the current input value, select value and options array.
   */
  isValidNewOption?: (
    inputValue: string,
    value: ValueType<Option, FallbackValue extends Array<any> ? true : false>,
    options: OptionsType<Option>
  ) => boolean;

  /** Set the loading state */
  loading?: boolean;

  /** Async: Text to display when loading options */
  loadingMessage?: (obj: { inputValue: string }) => string | null;

  /** Minimum height of the menu before flipping */
  minMenuHeight?: number;

  /** Maximum height of the menu before scrolling */
  maxMenuHeight?: number;

  /** Whether the menu is open */
  menuIsOpen?: boolean;

  /**
   * Default placement of the menu in relation to the control.
   * 'auto' will flip when there isn't enough space below the control.
   */
  menuPlacement?: MenuPlacement;

  /** The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition?: MenuPosition;

  /** Whether the menu should use a portal, and where it should attach */
  menuPortalTarget?: HTMLElement | null;

  /** Whether to block scroll events when the menu is open */
  menuShouldBlockScroll?: boolean;

  /** Whether the menu should be scrolled into view when it opens */
  menuShouldScrollIntoView?: boolean;

  /** Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string;

  /** Text to display when there are no options */
  noOptionsMessage?: (obj: { inputValue: string }) => string | null;

  /** Handle Blur Event */
  onBlur?: (e: React.FocusEvent<HTMLElement>, props: SelectEventProps<Option, Value, FallbackValue>) => void;

  /** Handle Change Event */
  onChange?: (nothing: null, props: SelectEventProps<Option, Value, FallbackValue>) => void;

  /**
   * If provided, this will be called with the input value when a new option is
   * created, and `onChange` will **not** be called.
   * Use this when you need more control over what happens when new options are created.
   */
  onCreateOption?: (inputValue: string) => void;

  /** Handle Focus Event */
  onFocus?: (e: React.FocusEvent<HTMLElement>, props: SelectEventProps<Option, Value, FallbackValue>) => void;

  /** On Input Change Event */
  onInputChange?: (nothing: null, props: SelectEventProps<Option, Value, FallbackValue>) => void;

  /** Handle key down events on the select */
  onKeyDown?: KeyboardEventHandler;

  /** On Menu Close Change Event */
  onMenuClose?: (nothing: null, props: SelectEventProps<Option, Value, FallbackValue>) => void;

  /** On Menu Open Change Event */
  onMenuOpen?: (nothing: null, props: SelectEventProps<Option, Value, FallbackValue>) => void;

  /** On Menu Scroll to Bottom Event */
  onMenuScrollToBottom?: (
    e: React.SyntheticEvent<HTMLElement>,
    props: SelectEventProps<Option, Value, FallbackValue>
  ) => void;

  /** On Menu Scroll to Top Event */
  onMenuScrollToTop?: (
    e: React.SyntheticEvent<HTMLElement>,
    props: SelectEventProps<Option, Value, FallbackValue>
  ) => void;

  /** Allows control of whether the menu is opened when the Select is focused */
  openMenuOnFocus?: boolean;

  /** Allows control of whether the menu is opened when the Select is clicked */
  openMenuOnClick?: boolean;

  /** Options Array */
  options: Option[];

  /** Number of options to jump in menu when page{up|down} keys are used */
  pageSize?: number;

  /** Placeholder text for the select value */
  placeholder?: React.ReactNode;

  /** Ref to select */
  ref?: React.Ref<MutableReactSelect<Option>>;

  /** Status to relay to screen readers */
  screenReaderStatus?: (obj: { count: number }) => string;

  /** Style modifier methods */
  styles?: StylesConfig<Option, FallbackValue extends Array<any> ? true : false>;

  /** Sets the tabIndex attribute on the input */
  tabIndex?: string | null;

  /** Select the currently focused option when the user presses tab */
  tabSelectsValue?: boolean;

  /** Theme modifier method */
  theme?: ThemeConfig;

  /** The Select Value */
  value?: Value;
}
