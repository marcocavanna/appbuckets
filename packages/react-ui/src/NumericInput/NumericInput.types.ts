import * as React from 'react';

import { IFormatNumberConfig } from '@appbuckets/formatters';

import {
  AppBucketsComponentProps,
  FocusHandler
} from '../generic';

import { StrictFieldProps } from '../Field';


export interface NumericInputProps extends AppBucketsComponentProps<StrictNumericInputProps, 'input'> {
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
  onBlur?: FocusHandler<HTMLInputElement, NumericInputProps>;

  /** On Change Event */
  onChange?: (nothing: null, props: NumericInputProps) => void;

  /** On Focus Event */
  onFocus?: FocusHandler<HTMLInputElement, NumericInputProps>;

  /** Ref to Input element */
  ref?: React.Ref<HTMLInputElement>;

  /** Auto Select all content on click */
  selectAllOnClick?: boolean;

  /** Set the input value */
  value?: number | null;
}
