import * as React from 'react';

import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  ResponsiveContentWidth
} from '../generic';

import { MenuProps } from '../Menu';
import { MenuItemProps } from '../Menu/MenuItem.types';
import { TabPanelProps } from './TabPanel.types';


export type TabPanelsShorthand = { trigger: ShorthandItem<MenuItemProps>, panel: ShorthandItem<TabPanelProps> };


export interface TabsProps extends UIMutableComponentProps<StrictTabsProps> {
}

export interface StrictTabsProps {
  /** Set the tab active index */
  activeIndex?: number;

  /** Avoid declared children */
  children?: never;

  /** Set the default active index */
  defaultActiveIndex?: number;

  /** Set layout props */
  layout?: { menuWidth: ResponsiveContentWidth, panelWidth: ResponsiveContentWidth, menuOn: 'left' | 'right' };

  /** Set menu props */
  menu?: MenuProps;

  /** On Tab Change handler */
  onTabChange?: (e: React.MouseEvent<HTMLElement>, props: TabsProps) => void;

  /** Panels shorthand */
  panels?: TabPanelsShorthand[];

  /** Choose to render active tab only */
  renderActiveOnly?: boolean;

  /** Render tab with vertical menu */
  vertical?: boolean;
}
