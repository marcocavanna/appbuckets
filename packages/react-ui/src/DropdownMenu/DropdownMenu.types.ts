import { ShorthandValue, ShorthandCollection } from '@appbuckets/react-ui-core';

import { MouseHandler, UIMutableComponentProps } from '../generic';

import { ButtonProps } from '../Button';
import { PopupOpenEvent, PopupPosition } from '../Popup';

import { MenuItemProps, MenuItemClickHandler } from '../Menu/MenuItem.types';


export interface DropdownMenuProps extends UIMutableComponentProps<StrictDropdownMenuProps> {
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
  onClose?: DropdownMenuStateChangeHandler;

  /** On Menu Item Click */
  onItemClick?: MenuItemClickHandler;

  /** Handler Menu Open */
  onOpen?: DropdownMenuStateChangeHandler;

  /** Control open state */
  open?: boolean;

  /** Set the openOn behaviour */
  openOn?: PopupOpenEvent[];

  /** Set the dropdown position, default to bottom right */
  position?: PopupPosition;

  /** Trigger Element */
  trigger?: ShorthandValue<ButtonProps>;
}

export type DropdownMenuStateChangeHandler = MouseHandler<HTMLElement, DropdownMenuProps>;
