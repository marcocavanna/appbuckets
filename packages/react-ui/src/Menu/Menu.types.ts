import { ShorthandItem, ShorthandCollection } from '@appbuckets/react-ui-core';
import { UIMutableComponentProps } from '../generic';

import { MenuItemProps, MenuItemClickHandler } from './MenuItem.types';


export interface MenuProps extends UIMutableComponentProps<StrictMenuProps> {
}

export interface StrictMenuProps {
  /** Index of the current active menu item */
  activeIndex?: number;

  /** Avoid active indexing style */
  avoidActive?: boolean;

  /** Draw all border */
  bordered?: boolean;

  /** Initial ActiveIndex, used to auto control active index prop */
  defaultActiveIndex?: number;

  /** Items Shorthand */
  items?: ShorthandCollection<MenuItemProps>;

  /** On item Click callback */
  onItemClick?: MenuItemClickHandler;

  /** Display a Header over the Menu */
  section?: ShorthandItem<MenuItemProps>;

  /** Use tab style to render the menu */
  tab?: boolean;

  /** Render the menu as text-only */
  text?: boolean;

  /** Render the menu vertically */
  vertical?: boolean;
}
