import * as React from 'react';

import { childrenUtils } from '@appbuckets/react-ui-core';

import TableHeaderCell from '../../Table/TableHeaderCell';

import { RxTableHeaderCellComponent } from '../RxTable.types';


/* --------
 * Component Definition
 * -------- */
const RxTableHeaderCell: RxTableHeaderCellComponent = (props) => {

  const {
    children,
    className,
    content,
    hasSorting,
    isActualSortingColumn,
    isReversedSorting,
    isVirtualized,
    onClick,
    style
  } = props;


  // ----
  // Component Render
  // ----
  return (
    TableHeaderCell.create(
      !childrenUtils.isNil(children) ? { children } : content || '',
      {
        autoGenerateKey: false,
        defaultProps   : {
          className
        },
        overrideProps  : (defaultProps) => ({
          as      : isVirtualized ? 'div' : 'th',
          sortable: hasSorting,
          sorted  : isActualSortingColumn
            ? (isReversedSorting ? 'desc' : 'asc')
            : undefined,
          style,
          onClick : (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
            if (onClick) {
              onClick();
            }
            if (defaultProps.onClick) {
              defaultProps.onClick(event);
            }
          }
        })
      }
    )
  );
};

RxTableHeaderCell.displayName = 'RxTableHeaderCell';

export default RxTableHeaderCell;
