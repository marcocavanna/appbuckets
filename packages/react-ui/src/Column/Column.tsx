import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { ColumnProps } from './Column.types';


/* --------
 * Component Render
 * -------- */
const Column: Creatable<React.FunctionComponent<ColumnProps>> = (receivedProps) => {

  const props = useWithDefaultProps('column', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Column, receivedProps, props);

  const classes = clsx(
    'column',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Column.displayName = 'Column';

Column.create = createShorthandFactory(Column, content => ({ content }));

export default Column;
