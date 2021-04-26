import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { FlexboxContainerProps, UIMutableComponentProps } from '../generic';

import { ButtonProps } from './Button.types';


export interface ButtonGroupProps extends UIMutableComponentProps<StrictButtonGroupProps>, FlexboxContainerProps {
}

export interface StrictButtonGroupProps {
  /** Button Collection Shorthand */
  buttons?: ShorthandCollection<ButtonProps>;

  /** Draw Group as full width content */
  full?: boolean;

  /** Display Button Vertically */
  vertical?: boolean;
}
