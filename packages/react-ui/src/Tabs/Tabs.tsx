import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  ShorthandCollection,
  ShorthandItem,
  createShorthandFactory,
  useElementType,
  useAutoControlledValue
} from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Column from '../Column';
import Menu from '../Menu';
import Row from '../Row';
import { MenuItemProps } from '../Menu/MenuItem.types';

import TabPanel from './TabPanel';
import { TabPanelProps } from './TabPanel.types';

import { TabPanelsShorthand, TabsProps } from './Tabs.types';


/* --------
 * Component Declare
 * -------- */
type TabsChildren = {
  Panel: typeof TabPanel;
};


/* --------
 * Component Render
 * -------- */
const Tabs: CreatableFunctionComponent<TabsProps> & TabsChildren = (receivedProps) => {

  const props = useWithDefaultProps('tabs', receivedProps);

  const {
    className,
    rest: {
      activeIndex: userDefinedActiveIndex,
      children,
      content,
      defaultActiveIndex,
      layout,
      menu,
      onTabChange,
      panels,
      renderActiveOnly,
      vertical,
      ...rest
    }
  } = useSharedClassName(props);

  /** Control active tab */
  const [ activeIndex, trySetActiveIndex ] = useAutoControlledValue(0, {
    prop       : userDefinedActiveIndex,
    defaultProp: defaultActiveIndex
  });

  /** Get the component element type */
  const ElementType = useElementType(Tabs, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'tabs',
    className
  );


  // ----
  // Define Handlers
  // ----
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, menuItemProps: MenuItemProps) => {
    /** Get menu item index */
    const { index } = menuItemProps;
    /** Fire user defined callback */
    if (onTabChange) {
      onTabChange(e, { ...props, activeIndex: index });
    }
    /** Try to set the new index */
    trySetActiveIndex(index ?? 0);
  };


  // ----
  // Define SubComponent Render
  // ----

  /** Current Active Panel */
  const activePanel: ShorthandItem<TabPanelProps> | undefined = Array.isArray(panels)
    ? panels[activeIndex]?.panel
    : undefined;

  /** Rendered Panels Element */
  const renderTabsElement = () => {
    /** If no active panel, or no Array, return empty component */
    if (!Array.isArray(panels) || !activePanel) {
      return null;
    }
    /** If must render active index only return a single panel */
    if (renderActiveOnly) {
      return TabPanel.create(activePanel, {
        autoGenerateKey: false,
        overrideProps  : { active: true }
      });
    }
    /** Else, return a tab panels collection */
    return panels.map(({ panel }, index) => TabPanel.create(panel, {
      autoGenerateKey: true,
      overrideProps  : {
        active: index === activeIndex
      }
    }));
  };

  /** Menu Element */
  const renderMenuElement = () => {
    /** If no panels, don't render the menu */
    if (!Array.isArray(panels)) {
      return null;
    }
    /** Get Triggers */
    const triggers: ShorthandCollection<MenuItemProps> = panels.map((panel) => panel.trigger);
    /** Return the menu */
    return Menu.create(menu, {
      autoGenerateKey: false,
      overrideProps  : {
        items      : triggers,
        onItemClick: handleMenuItemClick,
        activeIndex
      }
    });
  };


  // ----
  // Render Vertical Layout Element
  // ----
  if (menu?.vertical) {
    const menuColumn = (
      <Column width={layout?.menuWidth}>
        {renderMenuElement()}
      </Column>
    );

    return (
      <ElementType {...rest} className={classes}>
        <Row>
          {layout?.menuOn === 'left' && menuColumn}
          <Column width={layout?.panelWidth}>
            {renderTabsElement()}
          </Column>
          {layout?.menuOn === 'right' && menuColumn}
        </Row>
      </ElementType>
    );
  }

  // ----
  // Render Horizontal Layout Element
  // ----
  return (
    <ElementType {...rest} className={classes}>
      {renderMenuElement()}
      {renderTabsElement()}
    </ElementType>
  );
};

Tabs.displayName = 'Tabs';

Tabs.create = createShorthandFactory(Tabs, (panels) => ({
  panels: panels as TabPanelsShorthand[]
}));

Tabs.Panel = TabPanel;

export default Tabs;
