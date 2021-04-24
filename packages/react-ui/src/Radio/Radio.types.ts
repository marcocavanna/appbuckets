import * as React from 'react';

import {
  AppBucketsComponentProps,
  SharedComponentStateProps,
  ShorthandCollection
} from '../generic';

import { StrictFieldProps } from '../Field';

import { RadioOptionProps } from './RadioOption.types';


export interface RadioProps extends AppBucketsComponentProps<StrictRadioProps>, SharedComponentStateProps {

}

export interface StrictRadioProps extends StrictFieldProps {
  /** The default radio value */
  defaultValue?: string | number;

  /** On Change Value event */
  onChange?: (e: React.MouseEvent<HTMLLabelElement>, props: RadioProps) => void;

  /** Options shorthand collections */
  options?: ShorthandCollection<RadioOptionProps>;

  /** Display one option per line */
  stacked?: boolean;

  /** Set value as controlled component */
  value?: string | number;
}
