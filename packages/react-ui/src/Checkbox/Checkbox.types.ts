import * as React from 'react';

import { MouseHandler, UIVoidComponentProps } from '../generic';

import { StrictFieldProps } from '../Field';


export interface CheckboxProps extends UIVoidComponentProps<StrictCheckboxProps, 'input'> {

}

export interface StrictCheckboxProps extends Omit<StrictFieldProps, 'actions' | 'actionsPosition'> {
  /** Manual control checked state */
  checked?: boolean;

  /** Set the default checked value */
  defaultChecked?: boolean;

  /** Is indeterminate */
  indeterminate?: boolean;

  /** On Checked Event */
  onChecked?: CheckboxChangeHandler;

  /** On Click Handler */
  onClick?: CheckboxChangeHandler;

  /** On Unchecked Event */
  onUnchecked?: CheckboxChangeHandler;

  /** Format the Checkbox as a Radio Button */
  radio?: boolean;

  /** Ref to Input element */
  ref?: React.Ref<HTMLInputElement>;

  /** Format the Checkbox as a Switch */
  switch?: boolean;
}

export type CheckboxChangeHandler = MouseHandler<HTMLLabelElement, CheckboxProps>;
