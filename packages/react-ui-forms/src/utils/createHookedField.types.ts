import * as React from 'react';

import type { AppearanceProps } from '@appbuckets/react-ui/generic';

import type {
  FormState,
  ControllerFieldState,
  ValidationRule,
  Message,
  Validate
} from 'react-hook-form';


/* --------
 * Hooked Field Builder Options
 * -------- */
export interface CreateHookedFieldOptions<Props extends {} = {}, RefType = any, TValue = any, TDisplayedValue = TValue> {
  /** Component to Render */
  Component: React.ComponentType<HookedFieldComponentProps<Props, RefType, TValue, TDisplayedValue>>;

  /** Set component default props */
  defaultProps?: Partial<HookedFieldProps<Props, TValue>>;

  /** Set wrapped component display name */
  displayName?: string;

  /** Manually override the value passed to Component */
  formatValue?: HookedFieldFormatValue<Props, TValue, TDisplayedValue>;

  /** Override components Props */
  overrideProps?: Partial<HookedFieldProps<Props, TValue>>;

  /** Parse the value received from HookedFields before save on form */
  parseValue?: HookedFieldParseValue<Props, TValue>;

  /** Global Validation options */
  validation?: HookedFieldValidation<TValue>;
}


/* --------
 * Augmented Props used to render the Hooked Wrapped
 * field after applying the HOC Function
 * -------- */
export type HookedFieldComponent<Props, RefType, TValue> =
  React.ForwardRefExoticComponent<HookedFieldProps<Props, TValue> & React.RefAttributes<RefType>>;

export type HookedFieldProps<Props, TValue> =
  & StrictHookFieldProps<Props, TValue>
  & AppearanceProps
  & Props;

export type StrictHookFieldProps<Props, TValue> = {
  /** The field name is required to let hook form work */
  name: string;

  /** Get the error message only once form has been submitted at least once, default to `true` */
  getErrorOnSubmitted?: boolean;

  /** Get the error message once field has been touched, default to `false` */
  getErrorOnTouched?: boolean;

  /** Local onBlur function handler */
  onBlur?: (e?: React.MouseEvent, props?: Props) => void;

  /** Local onChange function handler */
  onChange?: (e?: React.ChangeEvent, props?: Props) => void;

  /** Override the default setTouchedOnChange behaviour */
  setTouchedOnChange?: boolean;

  /** Validation options */
  validation?: HookedFieldValidation<TValue>;
};

export type HookedFieldValidation<TValue> = {
  /** A Boolean which, if true, indicates that the input must have a value before the form can be submitted */
  required?: Message | ValidationRule<boolean>;

  /** The maximum value to accept for this input. */
  max?: ValidationRule<number | string>;

  /** The maximum length of the value to accept for this input. */
  maxLength?: ValidationRule<number>;

  /** The minimum value to accept for this input. */
  min?: ValidationRule<number | string>;

  /** The minimum length of the value to accept for this input. */
  minLength?: ValidationRule<number>;

  /** The regex pattern for the input. */
  pattern?: ValidationRule<RegExp>;

  /**
   * You can pass a callback function as the argument to validate,
   * or you can pass an object of callback functions to validate all of them.
   */
  validate?: Validate<TValue>
};


/* --------
 * A User Defined Function used to compute
 * the value key passed to component render
 * this will be used to separate the form value
 * to the displayed value.
 * Eg. while using the Time Input, the form value
 * must remain a timestamp number, but the input
 * must display the formatted choose time
 * -------- */
export type HookedFieldFormatValue<Props, TValue, TDisplayedValue> = (
  /** Received Event from Component */
  value: TValue,
  /** Component Props */
  props?: HookedFieldProps<Props, TValue>
) => TDisplayedValue;


/* --------
 * A User Defined Function that will overwrite the default
 * onChange handler defined in createHookedField HOC Function
 * this will be used to compute the value set in form field
 * -------- */
export type HookedFieldParseValue<Props, TValue> = (data: {
  /** The original FormEvent generated */
  event?: React.ChangeEvent | undefined;
  /** Component Props */
  props?: Props;
  /** Field name */
  name: string;
  /** Field Meta Props */
  meta: FieldMeta;
}) => TValue;


/* --------
 * Hooked Field Props
 * Props passed down to Component wrapped by
 * createHookField function
 * -------- */
export interface HookedFieldComponentProps<Props, RefType, TValue, TDisplayedValue = TValue> {
  /** Parent form state */
  formState: FormState<any>;

  /** Ref to pass to Component */
  innerRef: React.Ref<RefType>;

  /** The field state */
  meta: FieldMeta;

  /** All default component props, wrapped by HOC function */
  rest: Props & {
    /** On Blur Handler */
    onBlur: (...args: any[]) => void;
    /** On Change Handler */
    onChange: (...args: any[]) => void;
    /** The field name */
    name: string;
    /** The field value */
    value: TDisplayedValue
  };
}


/* --------
 * Field State
 * Computed properties generated on render time
 * -------- */
export interface FieldMeta extends ControllerFieldState {
  /** Set field appearance */
  appearance: AppearanceProps;

  /** True while form is submitting */
  isSubmitting: boolean;

  /** Validation message */
  message: string | undefined;
}
