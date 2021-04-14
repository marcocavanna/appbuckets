import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { FlexboxContainer } from '../generic';

import { ButtonProps } from './Button.types';


export interface ButtonGroupProps extends FlexboxContainer<StrictButtonGroupProps> {
}

export interface StrictButtonGroupProps {
  /** Button Collection Shorthand */
  buttons?: ShorthandCollection<ButtonProps>;

  /** Draw Group as full width content */
  full?: boolean;

  /** Display Button Vertically */
  vertical?: boolean;
}
