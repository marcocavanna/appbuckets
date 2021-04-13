import * as React from 'react';

import { ShorthandValue } from '@appbuckets/react-ui-core';

import {
  MinimalAppBucketsComponentProps,
  ShorthandCollection
} from '../generic';

import { ButtonProps } from '../Button';
import { PopupOpenEvent, PopupPosition } from '../Popup';

import { MenuItemProps } from '../Menu/MenuItem.types';


export interface DropdownMenuProps extends MinimalAppBucketsComponentProps<StrictDropdownMenuProps> {
}

export interface StrictDropdownMenuProps {
  /** Draw the popup using basic style */
  basic?: boolean;

  /** Close dropdown on Item clicked */
  closeOnItemClicked?: boolean;

  /** Set initial open value */
  defaultOpen?: boolean;

  /** Invert color of dropdown */
  inverted?: boolean;

  /** Menu Items */
  items?: ShorthandCollection<MenuItemProps>;

  /** Handler Menu Close */
  onClose?: (e: React.MouseEvent<HTMLElement>, props: DropdownMenuProps) => void;

  /** On Menu Item Click */
  onItemClick?: (e: React.MouseEvent<HTMLElement>, props: MenuItemProps) => void;

  /** Handler Menu Open */
  onOpen?: (e: React.MouseEvent<HTMLElement>, props: DropdownMenuProps) => void;

  /** Control open state */
  open?: boolean;

  /** Set the openOn behaviour */
  openOn?: PopupOpenEvent[];

  /** Set the dropdown position, default to bottom right */
  position?: PopupPosition;

  /** Trigger Element */
  trigger?: ShorthandValue<ButtonProps>;
}
