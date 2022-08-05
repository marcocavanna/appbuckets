import * as React from 'react';

import { IFormatNumberConfig } from '@appbuckets/formatters';

import {
  UIComponentProps,
  FocusHandler,
  VoidHandler
} from '../generic';

import { StrictFieldProps } from '../Field';


export interface NumericInputProps extends UIComponentProps<StrictNumericInputProps, 'input'> {
}

export interface StrictNumericInputProps extends StrictFieldProps, IFormatNumberConfig {
  /** Set if numeric input must allow negative number */
  allowNegative?: boolean;

  /** The default input value */
  defaultValue?: number | null;

  /** Set a max number */
  max?: number;

  /** Set a min number */
  min?: number;

  /** On Blur Event */
  onBlur?: NumericInputFocusHandler;

  /** On Change Event */
  onChange?: NumericInputChangeHandler;

  /** On Focus Event */
  onFocus?: NumericInputFocusHandler;

  /** Ref to Input element */
  ref?: React.Ref<HTMLInputElement>;

  /** Auto Select all content on click */
  selectAllOnClick?: boolean;

  /** Set the input value */
  value?: number | null;
}

export type NumericInputFocusHandler = FocusHandler<HTMLInputElement, NumericInputProps>;

export type NumericInputChangeHandler = VoidHandler<NumericInputProps>;
