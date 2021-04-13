import {
  AppBucketsComponentProps
} from '../generic';

import { StrictTableCellProps } from './TableCell.types';


export interface TableHeaderCellProps extends AppBucketsComponentProps<StrictTableHeaderCellProps, 'th'> {
}

export interface StrictTableHeaderCellProps extends StrictTableCellProps {
  /** Set the Cell as Sortable */
  sortable?: boolean;

  /** Set the Sorted Direction */
  sorted?: 'asc' | 'desc';
}
