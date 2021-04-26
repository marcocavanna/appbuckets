import * as React from 'react';

import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps
} from '../generic';

import { IconProps } from '../Icon';
import { ButtonProps } from '../Button';


export interface LabelProps extends UIMutableComponentProps<StrictLabelProps>, AppearanceProps {
}

export interface StrictLabelProps {
  /** Set the Disabled style */
  disabled?: boolean;

  /** Icon shorthand */
  icon?: AppBucketsIcon<IconProps>;

  /** On click Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: LabelProps) => void;

  /** On label remove handler */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>, props: LabelProps) => void;

  /** Set the label as removable */
  removable?: boolean | ShorthandItem<ButtonProps>;
}
