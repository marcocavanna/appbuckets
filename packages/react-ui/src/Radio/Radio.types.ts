import {
  UIMutableVoidComponentProps,
  AppearanceProps,
  ShorthandCollection,
  MouseHandler
} from '../generic';

import { StrictFieldProps } from '../Field';

import { RadioOptionProps } from './RadioOption.types';


export interface RadioProps extends UIMutableVoidComponentProps<StrictRadioProps>, AppearanceProps {

}

export interface StrictRadioProps extends StrictFieldProps {
  /** The default radio value */
  defaultValue?: string | number;

  /** On Change Value event */
  onChange?: RadioChangeHandler;

  /** Options shorthand collections */
  options?: ShorthandCollection<RadioOptionProps>;

  /** Display one option per line */
  stacked?: boolean;

  /** Set value as controlled component */
  value?: string | number;
}

export type RadioChangeHandler = MouseHandler<HTMLLabelElement, RadioProps>;
