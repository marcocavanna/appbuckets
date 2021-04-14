import * as React from 'react';

import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { AppBucketsComponentProps } from '../generic';

import { ButtonProps } from '../Button';


export interface ModalActionsProps extends AppBucketsComponentProps<StrictModalActionsProps> {
}

export interface StrictModalActionsProps {
  /** Buttons Action Shorthand */
  actions?: ShorthandCollection<ButtonProps>;

  /** On Action Click Handler */
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>, props: ButtonProps) => void;
}
