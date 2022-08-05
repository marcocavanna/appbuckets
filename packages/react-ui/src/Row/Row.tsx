import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { RowProps } from './Row.types';

import Column from '../Column';


/* --------
 * Component Render
 * -------- */
const Row: React.FunctionComponent<RowProps> = (receivedProps) => {

  const props = useWithDefaultProps('row', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      columns,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Row, receivedProps, props);

  const classes = clsx(
    'with-columns',
    className
  );

  if (Array.isArray(columns)) {
    return (
      <ElementType {...rest} className={classes}>
        {columns.map(column => (
          Column.create(column, { autoGenerateKey: true })
        ))}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Row.displayName = 'Row';

export default Row;
