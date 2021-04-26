import * as React from 'react';

import { ShorthandItem } from '@appbuckets/react-ui-core';

import { DayPickerProps as ReactDayPickerProps } from 'react-day-picker';

import { UIVoidComponentProps } from '../generic';

import { ButtonProps } from '../Button';
import { FieldProps } from '../Field';
import { InputProps } from '../Input';


export type ParsableDate = null | string | number | Date;

export interface DayPickerProps<DateType extends ParsableDate = ParsableDate>
  extends UIVoidComponentProps<StrictDayPickerProps<DateType>> {
}

export interface StrictDayPickerProps<DateType> extends ReactDayPickerProps, FieldProps {
  /** Set field as Clearable, this option will be passed down to input element */
  clearable?: boolean;

  /** Set clear button Content, this option will be used to build the clear button in modal view */
  clearButton?: ShorthandItem<ButtonProps>;

  /** Close the DayPicker once a day has been selected */
  closeOnDayPicked?: boolean;

  /** Set the date */
  date?: DateType;

  /** Set the default date */
  defaultDate?: ParsableDate;

  /** Set the default open state */
  defaultOpen?: boolean;

  /** Disable the Day Picker */
  disabled?: boolean;

  /** Custom format function to show date */
  format?: (date: Date) => string;

  /** On calendar close event handler */
  onCalendarClose?: (nothing: null, props: DayPickerProps) => void;

  /** On calendar open event handler */
  onCalendarOpen?: (nothing: null, props: DayPickerProps) => void;

  /** On day change event handler */
  onDayChange?: (nothing: null, props: DayPickerProps) => void;

  /** On input value change handler */
  onInputChange?: (e: React.FormEvent<HTMLInputElement>, props: InputProps) => void;

  /** Control the open props */
  open?: boolean;

  /** Custom parse function to transform any value into a date */
  parse?: (date: Exclude<ParsableDate, null>) => Date | null;

  /** Show input mask */
  showInputMask?: boolean;

  /** Timestamp of selected date */
  readonly timestamp?: number | null;

  /** Set the trigger element for modal type DayPicker */
  trigger?: React.ReactElement;

  /** Set trigger props */
  triggerProps?: ButtonProps;

  /** Set the type of the DayPicker */
  type?: 'input' | 'modal';
}
