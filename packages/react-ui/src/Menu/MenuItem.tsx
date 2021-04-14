import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  createShorthandFactory,
  childrenUtils,
  useAutoControlledValue,
  useElementType
} from '@appbuckets/react-ui-core';

import { useRipples } from '../hooks/useRipples';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Icon from '../Icon';

// eslint-disable-next-line import/no-named-default
import type { default as MenuComponent } from './Menu';
import { MenuItemProps } from './MenuItem.types';


/* --------
 * Import Menu async to avoid circular dependencies
 * -------- */
let Menu: typeof MenuComponent | null = null;

import ('./Menu').then(({ default: menuComponent }) => {
  Menu = menuComponent;
});


/* --------
 * Component Render
 * -------- */
const MenuItem: CreatableFunctionComponent<MenuItemProps> = (receivedProps) => {

  const props = useWithDefaultProps('menuItem', receivedProps);

  const {
    className,
    rest: {
      active,
      children,
      content,
      defaultMenuIsOpen: userDefinedDefaultMenuIsOpen,
      disabled,
      disableRipple,
      header,
      icon,
      index,
      menu,
      menuIsOpen: userDefinedMenuIsOpen,
      onClick,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Ripple Generator */
  const [ showRipple, itemRipples ] = useRipples();

  /** Get the component element type */
  const ElementType = useElementType(MenuItem, receivedProps, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the auto controlled state for collapsable sub menu */
  const [ menuIsOpen, trySetMenuIsOpen ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultMenuIsOpen,
    prop       : userDefinedMenuIsOpen
  });

  /** Initialize the Click Handler */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    e.stopPropagation();

    if (!header && !disableRipple) {
      showRipple(e);
    }

    if (typeof onClick === 'function') {
      onClick(e, props);
    }

    /** If a sub menu exists, toggle menu */
    if (menu) {
      trySetMenuIsOpen(!menuIsOpen);
    }
  };

  /** Build the element class list */
  const classes = clsx(
    {
      active,
      'header-item'    : header || menu,
      'submenu-trigger': menu,
      'submenu-open'   : menu && menuIsOpen,
      disabled
    },
    'menu-item',
    stateClasses,
    className
  );

  /** Memoize the Icon Element */
  const iconElement = React.useMemo(
    () => Icon.create(icon, { autoGenerateKey: false }),
    [ icon ]
  );

  /** Get the Content Element */
  const contentElement: React.ReactElement | undefined = (
    (childrenUtils.isNil(children) ? content : children) ?? undefined
  ) as React.ReactElement | undefined;

  /** Memoize SubMenu */
  const menuItemContent = React.useMemo(
    () => {
      /**
       * If no menu prop has been defined, or the
       * Menu component is still no imported from
       * async import, return the content element
       */
      if (!menu || !Menu || !menuIsOpen) {
        return null;
      }

      /** Build the subMenu */
      return Menu.create(menu, { autoGenerateKey: false });
    },
    [
      menu,
      menuIsOpen
    ]
  );

  return (
    <React.Fragment>
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {iconElement}
        {contentElement}
        {itemRipples}
      </ElementType>
      {menuItemContent}
    </React.Fragment>
  );

};

MenuItem.displayName = 'MenuItem';

MenuItem.create = createShorthandFactory(
  MenuItem,
  (content) => ({ content })
);

export default MenuItem;
