import { ShorthandContent, ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps,
  MouseHandler
} from '../generic';

import { BadgeProps } from '../Badge';

import { IconProps } from '../Icon';


export interface AvatarProps extends UIMutableComponentProps<StrictAvatarProps>, AppearanceProps {
}

export interface StrictAvatarProps {
  /** Draw the Notification Badge */
  badge?: ShorthandItem<BadgeProps>;

  /** Set disabled state */
  disabled?: boolean;

  /** Remove Background Color */
  flat?: boolean;

  /** Use an image instead content */
  image?: ShorthandItem<JSX.IntrinsicElements['img']>;

  /** Set avatar icon */
  icon?: AppBucketsIcon<IconProps>;

  /** On Click Event Handler */
  onClick?: AvatarClickHandler;

  /** Set avatar tooltip */
  tooltip?: ShorthandContent;

  /** Avatar type */
  type?: 'round' | 'square' | 'flex';
}

export type AvatarClickHandler = MouseHandler<HTMLElement, AvatarProps>;
