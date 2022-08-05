import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Icon from '../Icon';

import { TableCellProps } from './TableCell.types';
import TableCellContent from './TableCellContent';


/* --------
 * Component Declare
 * -------- */
type TableCellChildren = {
  Content: typeof TableCellContent
};


/* --------
 * Component Render
 * -------- */
const TableCell: Creatable<React.FunctionComponent<TableCellProps>> & TableCellChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('tableCell', receivedProps);

  const {
    className,
    rest: {
      active,
      children,
      content,
      header,
      icon,
      meta,
      selectable,
      wrapped,
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);

  const ElementType = useElementType(TableCell, receivedProps, props);

  const classes = clsx(
    { active, selectable, wrapped, 'with-icon': !!icon },
    'cell',
    className,
    stateClassName
  );


  // ----
  // Generate Memoized Shorthand Content
  // ----
  const iconElement = React.useMemo(
    () => Icon.create(icon, { autoGenerateKey: false }),
    [ icon ]
  );

  const metaElement = React.useMemo(
    () => TableCellContent.create(meta, { autoGenerateKey: false, overrideProps: { type: 'meta' } }),
    [ meta ]
  );

  const titleElement = React.useMemo(
    () => TableCellContent.create(header, { autoGenerateKey: false, overrideProps: { type: 'title' } }),
    [ header ]
  );

  const contentElement = React.useMemo(
    () => TableCellContent.create(content, { autoGenerateKey: false, overrideProps: { type: 'content' } }),
    [ content ]
  );


  // ----
  // Render Children
  // ----
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {iconElement}
        {children}
      </ElementType>
    );
  }


  // ----
  // Render Using Shorthand
  // ----
  return (
    <ElementType {...rest} className={classes}>
      {iconElement}
      {metaElement}
      {titleElement}
      {contentElement}
    </ElementType>
  );

};

TableCell.displayName = 'TableCell';

TableCell.Content = TableCellContent;

TableCell.create = createShorthandFactory(
  TableCell,
  (content) => ({ header: content })
);

export default TableCell;
