import * as React from 'react';

import { ShorthandItem, ShorthandCollection } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppearanceProps
} from '../generic';

import { AvatarProps } from '../Avatar';
import { ButtonProps } from '../Button';

import { StrictItemContentProps } from './ItemContent.types';


export interface ItemProps extends UIMutableComponentProps<StrictItemProps>, AppearanceProps {
}

export interface StrictItemProps extends StrictItemContentProps {
  /** Show item as Active */
  active?: boolean;

  /** Avatar Shorthand Props */
  avatar?: ShorthandItem<AvatarProps>;

  /** Align centered vertically */
  centered?: boolean;

  /** Show item as Disabled */
  disabled?: boolean;

  /** On Click event Handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: ItemProps) => void;

  /** Put the Item into a Solid Box */
  solid?: boolean;

  /** Shorthand tools */
  tools?: ShorthandCollection<ButtonProps>;
}
