import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { ItemHeaderProps } from './ItemHeader.types';


/* --------
 * Component Render
 * -------- */
const ItemHeader: Creatable<React.FunctionComponent<ItemHeaderProps>> = (receivedProps) => {

  const props = useWithDefaultProps('itemHeader', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemHeader, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'item-header',
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
      {content}
    </ElementType>
  );
};

ItemHeader.displayName = 'ItemHeader';

ItemHeader.create = createShorthandFactory(ItemHeader, (content) => ({ content }));

export default ItemHeader;
