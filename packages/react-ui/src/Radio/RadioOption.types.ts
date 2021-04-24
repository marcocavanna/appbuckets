import * as React from 'react';

import { AppBucketsComponentProps } from '../generic';

import { StrictCheckboxProps } from '../Checkbox';


export interface RadioOptionProps extends AppBucketsComponentProps<StrictRadioOptionProps, 'input'> {

}

export interface StrictRadioOptionProps extends Omit<StrictCheckboxProps, 'onClick'> {
  /** On radio click event */
  onClick?: (e: React.MouseEvent<HTMLLabelElement>, props: RadioOptionProps) => void;

  /** Radio value */
  value: string | number;
}
