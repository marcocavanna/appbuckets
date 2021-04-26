import * as React from 'react';

import { UIVoidComponentProps } from '../generic';

import { StrictCheckboxProps } from '../Checkbox';


export interface RadioOptionProps extends UIVoidComponentProps<StrictRadioOptionProps, 'input'> {

}

export interface StrictRadioOptionProps extends Omit<StrictCheckboxProps, 'onClick'> {
  /** On radio click event */
  onClick?: (e: React.MouseEvent<HTMLLabelElement>, props: RadioOptionProps) => void;

  /** Radio value */
  value: string | number;
}
