import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  ShorthandCollection,
  ShorthandItem,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Button from '../Button';
import type { ButtonProps } from '../Button';

import { ItemToolsProps } from './ItemTools.types';


/* --------
 * Component Render
 * -------- */
const ItemTools: CreatableFunctionComponent<ItemToolsProps> = (receivedProps) => {

  const props = useWithDefaultProps('itemTools', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      tools,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemTools, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'tools',
    className
  );

  /** Render Item Tools */
  return (
    <ElementType {...rest} className={classes}>
      {tools && tools.map((tool: ShorthandItem<ButtonProps>) => (
        Button.create(tool, {
          autoGenerateKey: false,
          defaultProps   : {
            disabled,
            flat: true
          }
        })
      ))}
    </ElementType>
  );
};

ItemTools.displayName = 'ItemTools';

ItemTools.create = createShorthandFactory(ItemTools, (tools) => ({ tools: tools as ShorthandCollection<ButtonProps> }));

export default ItemTools;
