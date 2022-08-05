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

import { TableCellContentProps } from './TableCellContent.types';


/* --------
 * Component Render
 * -------- */
const TableCellContent: Creatable<React.FunctionComponent<TableCellContentProps>> = (receivedProps) => {

  const props = useWithDefaultProps('tableCellContent', receivedProps);
  const {
    className,
    rest: {
      children,
      content,
      type,
      truncate,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(TableCellContent, receivedProps, props);

  const classes = clsx(
    truncate && 'truncated',
    !!type && `cell-text-${type}`,
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

TableCellContent.displayName = 'CellContent';

TableCellContent.create = createShorthandFactory(TableCellContent, (content) => ({ content }));

export default TableCellContent;
