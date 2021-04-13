import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  CreatableFunctionComponent,
  ShorthandCollection
} from '../generic';

import {
  useElementType,
  useSharedClassName
} from '../utils';

import {
  useAutoControlledValue
} from '../hooks/useAutoControlledValue';
import { useWithDefaultProps } from '../BucketTheme';

import { MenuProps } from './Menu.types';

import MenuItem from './MenuItem';
import { MenuItemProps } from './MenuItem.types';


/* --------
 * Component Declare
 * -------- */
export type MenuChildren = {
  Item: typeof MenuItem
};


/* --------
 * Component Declare
 * -------- */
const Menu: CreatableFunctionComponent<MenuProps> & MenuChildren = (receivedProps) => {

  const props = useWithDefaultProps('menu', receivedProps);

  const {
    className,
    rest: {
      activeIndex: userDefinedActiveIndex,
      avoidActive,
      bordered,
      children,
      content,
      defaultActiveIndex,
      items,
      onItemClick,
      section,
      tab,
      text,
      vertical,
      ...rest
    }
  } = useSharedClassName(props);

  /** Control Active Index */
  const [ activeIndex, trySetActiveIndex ] = useAutoControlledValue(0, {
    prop       : userDefinedActiveIndex,
    defaultProp: defaultActiveIndex
  });

  /** Get the component element type */
  const ElementType = useElementType(Menu, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    {
      bordered,
      vertical,
      horizontal       : !vertical,
      base             : !text && !tab,
      text,
      tab,
      'avoiding-active': avoidActive
    },
    'menu',
    className
  );

  /** Build the Section element */
  const sectionElement = React.useMemo(
    () => (
      MenuItem.create(section, {
        autoGenerateKey: false,
        overrideProps  : {
          header: true
        }
      })
    ),
    [ section ]
  );

  /** Memoize the onClick item */
  const getMenuItemOverridenProps = React.useCallback(
    (predefinedProps: MenuItemProps): MenuItemProps => ({
      onClick: (e, itemProps) => {
        /** Extract Index from Props */
        const { index } = itemProps;
        /** Try to set the new Active Index state, if item is not a sub menu trigger */
        if (!itemProps.menu && !avoidActive) {
          trySetActiveIndex(index as number);
        }
        /** Invoke props if exists */
        if (onItemClick) {
          onItemClick(e, itemProps);
        }
        if (predefinedProps.onClick) {
          predefinedProps.onClick(e, itemProps);
        }
      }
    }),
    [
      avoidActive,
      onItemClick,
      trySetActiveIndex
    ]
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {sectionElement}
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {sectionElement}
      {Array.isArray(items) ? items.map((item, ix) => (
        MenuItem.create(item, {
          autoGenerateKey: true,
          defaultProps   : {
            active: !avoidActive ? activeIndex === ix : undefined,
            index : ix
          },
          overrideProps  : getMenuItemOverridenProps
        })
      )) : content}
    </ElementType>
  );
};

Menu.displayName = 'Menu';

Menu.create = createShorthandFactory(Menu, (items) => ({
  items: items as ShorthandCollection<MenuItemProps>
}));

Menu.Item = MenuItem;

export default Menu;
