import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps } from '../generic';

import { ButtonProps, ButtonClickHandler } from '../Button';


export interface ModalActionsProps extends UIMutableComponentProps<StrictModalActionsProps> {
}

export interface StrictModalActionsProps {
  /** Buttons Action Shorthand */
  actions?: ShorthandCollection<ButtonProps>;

  /** On Action Click Handler */
  onActionClick?: ModalActionClickHandler;
}

export type ModalActionClickHandler = ButtonClickHandler;
