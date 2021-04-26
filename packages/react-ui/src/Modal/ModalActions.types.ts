import * as React from 'react';

import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps } from '../generic';

import { ButtonProps } from '../Button';


export interface ModalActionsProps extends UIMutableComponentProps<StrictModalActionsProps> {
}

export interface StrictModalActionsProps {
  /** Buttons Action Shorthand */
  actions?: ShorthandCollection<ButtonProps>;

  /** On Action Click Handler */
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void;
}
