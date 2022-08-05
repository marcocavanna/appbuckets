import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps,
  MouseHandler
} from '../generic';

import { IconProps } from '../Icon';

import type { MenuProps } from './Menu.types';


export interface MenuItemProps extends UIMutableComponentProps<StrictMenuItemProps>, AppearanceProps {

}

export interface StrictMenuItemProps {
  /** Set the Active Style */
  active?: boolean;

  /** Set the default state for menu is open value */
  defaultMenuIsOpen?: boolean;

  /** Disable the Menu Item */
  disabled?: boolean;

  /** Disable the Ripple Effect */
  disableRipple?: boolean;

  /** Set as Header Item */
  header?: boolean;

  /** Draw Item Icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Menu item index position */
  index?: number;

  /** Build a submenu */
  menu?: ShorthandItem<MenuProps>;

  /** Manually set open state for menu */
  menuIsOpen?: boolean;

  /** On Click Element Handler */
  onClick?: MenuItemClickHandler;
}

export type MenuItemClickHandler = MouseHandler<HTMLElement, MenuItemProps>;
