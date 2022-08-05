import { ShorthandItem, ShorthandCollection } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppearanceProps,
  MouseHandler
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
  onClick?: ItemClickHandler;

  /** Put the Item into a Solid Box */
  solid?: boolean;

  /** Shorthand tools */
  tools?: ShorthandCollection<ButtonProps>;
}

export type ItemClickHandler = MouseHandler<HTMLElement, ItemProps>;
