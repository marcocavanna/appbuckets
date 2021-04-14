import * as React from 'react';
import clsx from 'clsx';

import { CreatableFunctionComponent, createShorthandFactory } from '@appbuckets/react-ui-core';

import {
  useSharedClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { TableHeaderCellProps } from './TableHeaderCell.types';
import TableCell from './TableCell';


/* --------
 * Component Render
 * -------- */
const TableHeaderCell: CreatableFunctionComponent<TableHeaderCellProps> = (receivedProps) => {

  const props = useWithDefaultProps('tableHeaderCell', receivedProps);

  const {
    className,
    rest: {
      sortable,
      sorted,
      ...rest
    }
  } = useSharedClassName(props);

  const classes = clsx(
    className,
    sorted && 'sorted',
    sorted,
    sortable && 'sortable'
  );

  return (
    <TableCell
      {...rest}
      as={props.as}
      className={classes}
      icon={sortable
        ? {
          name     : sorted === 'desc'
            ? 'sort-up'
            : sorted === 'asc'
              ? 'sort-down'
              : 'sort',
          className: 'clickable'
        }
        : undefined}
    />
  );

};

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.create = createShorthandFactory(TableHeaderCell, (content) => ({ header: content }));

export default TableHeaderCell;
