import { UIMutableComponentProps } from '../generic';

import { StrictTableCellProps } from './TableCell.types';


export interface TableHeaderCellProps extends UIMutableComponentProps<StrictTableHeaderCellProps, 'th'> {
}

export interface StrictTableHeaderCellProps extends StrictTableCellProps {
  /** Set the Cell as Sortable */
  sortable?: boolean;

  /** Set the Sorted Direction */
  sorted?: 'asc' | 'desc';
}
