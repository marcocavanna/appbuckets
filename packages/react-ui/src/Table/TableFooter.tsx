import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { TableFooterProps } from './TableFooter.types';


/* --------
 * Component Render
 * -------- */
const TableFooter: CreatableFunctionComponent<TableFooterProps> = (receivedProps) => {

  const props = useWithDefaultProps('tableFooter', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableFooter, receivedProps, props);

  const classes = clsx(
    className,
    'foot'
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

TableFooter.displayName = 'TableFooter';

TableFooter.create = createShorthandFactory(TableFooter, (content) => ({ content }));

export default TableFooter;
