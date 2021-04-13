import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';
import { ShorthandItem } from '../generic';

import {
  useElementType,
  useSharedClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

// eslint-disable-next-line import/no-named-default
import type { default as ItemComponent } from './Item';
import { ItemProps } from './Item.types';

import { ItemGroupProps } from './ItemGroup.types';


/* --------
 * Component Import to avoid Circular Dependencies
 * -------- */
let Item: typeof ItemComponent | null = null;

import('./Item').then(({ default: itemComponent }) => {
  Item = itemComponent;
});


/* --------
 * Component Declare
 * -------- */
type ItemGroupComponent = React.FunctionComponent<ItemGroupProps>;


/* --------
 * Component Render
 * -------- */
const ItemGroup: ItemGroupComponent = (receivedProps) => {

  const props = useWithDefaultProps('itemGroup', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      divided,
      items,
      relaxed,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemGroup, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    { divided, relaxed },
    'items',
    className
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {items && items.map((item: ShorthandItem<ItemProps>) => Item && Item.create(item, {
        autoGenerateKey: false
      }))}
    </ElementType>
  );
};

ItemGroup.displayName = 'ItemGroup';

export default ItemGroup;
