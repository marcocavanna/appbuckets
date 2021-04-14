import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  ShorthandCollection,
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { TableRowProps } from './TableRow.types';

import TableCell from './TableCell';
import { TableCellProps } from './TableCell.types';


/* --------
 * Component Declare
 * -------- */
const TableRow: CreatableFunctionComponent<TableRowProps> = (receivedProps) => {

  const props = useWithDefaultProps('tableRow', receivedProps);

  const {
    className,
    rest: {
      active,
      children,
      cellAs,
      cells,
      content,
      disabled,
      selectable,
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);

  const ElementType = useElementType(TableRow, receivedProps, props);

  const classes = clsx(
    { active, disabled, selectable },
    'row',
    stateClassName,
    className
  );

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const cellsElements = Array.isArray(cells) && (
    cells.map((cell) => (
      TableCell.create(cell, { autoGenerateKey: true, defaultProps: { as: cellAs } })
    ))
  );

  return (
    <ElementType {...rest} className={classes}>
      {cellsElements}
    </ElementType>
  );

};


TableRow.displayName = 'TableRow';

TableRow.create = createShorthandFactory(TableRow, cells => ({ cells: cells as ShorthandCollection<TableCellProps> }));

export default TableRow;
