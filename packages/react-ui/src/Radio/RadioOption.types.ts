import { MouseHandler, UIVoidComponentProps } from '../generic';

import { StrictCheckboxProps } from '../Checkbox';


export interface RadioOptionProps extends UIVoidComponentProps<StrictRadioOptionProps, 'input'> {

}

export interface StrictRadioOptionProps extends Omit<StrictCheckboxProps, 'onClick'> {
  /** On radio click event */
  onClick?: RadioOptionsClickHandler;

  /** Radio value */
  value: string | number;
}

export type RadioOptionsClickHandler = MouseHandler<HTMLLabelElement, RadioOptionProps>;
