import * as React from 'react';

import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  AppBucketsIcon,
  AppBucketsComponentProps,
  SharedComponentStateProps
} from '../generic';

import { IconProps } from '../Icon';

import type { MenuProps } from './Menu.types';


export interface MenuItemProps extends AppBucketsComponentProps<StrictMenuItemProps>, SharedComponentStateProps {

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
  onClick?: (e: React.MouseEvent<HTMLElement>, props: MenuItemProps) => void;
}
