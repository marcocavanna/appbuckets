import * as React from 'react';

import { ShorthandCollection } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentStrictProps,
  AppearanceProps
} from '../generic';

import { TableCellProps } from './TableCell.types';
import { TableHeaderCellProps } from './TableHeaderCell.types';


export interface TableRowProps<Cell = TableCellProps & TableHeaderCellProps>
  extends UIMutableComponentStrictProps<StrictTableRowProps<Cell>, 'tr'> {
}

export interface StrictTableRowProps<Cell> extends AppearanceProps {

  /** Set the Row as Active */
  active?: boolean;

  /** Set the ElementType for rendered cells */
  cellAs?: React.ElementType;

  /** Cells array */
  cells?: ShorthandCollection<Cell>;

  /** Set the Row Disabled State */
  disabled?: boolean;

  /** Set the Row as Selectable */
  selectable?: boolean;

}
