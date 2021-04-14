import * as React from 'react';

import { ShorthandContent, ShorthandItem } from '@appbuckets/react-ui-core';

import {
  AppBucketsComponentProps,
  AppBucketsIcon,
  SharedComponentStateProps
} from '../generic';

import { BadgeProps } from '../Badge';

import { IconProps } from '../Icon';


export interface AvatarProps extends AppBucketsComponentProps<StrictAvatarProps>, SharedComponentStateProps {
}

export interface StrictAvatarProps {
  /** Draw the Notification Badge */
  badge?: ShorthandItem<BadgeProps>;

  /** Set disabled state */
  disabled?: boolean;

  /** Remove Background Color */
  flat?: boolean;

  /** Set avatar icon */
  icon?: AppBucketsIcon<IconProps>;

  /** On Click Event Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: AvatarProps) => void;

  /** Set avatar tooltip */
  tooltip?: ShorthandContent;

  /** Avatar type */
  type?: 'round' | 'square' | 'flex';
}
