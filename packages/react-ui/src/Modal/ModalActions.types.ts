import * as React from 'react';

import {
  AppBucketsComponentProps,
  ShorthandCollection
} from '../generic';

import { ButtonProps } from '../Button';


export interface ModalActionsProps extends AppBucketsComponentProps<StrictModalActionsProps> {
}

export interface StrictModalActionsProps {
  /** Buttons Action Shorthand */
  actions?: ShorthandCollection<ButtonProps>;

  /** On Action Click Handler */
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void;
}
