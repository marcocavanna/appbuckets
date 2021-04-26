import { UIMutableComponentProps } from '../generic';


export interface TableCellContentProps extends UIMutableComponentProps<StrictTableCellContentProps, 'p'> {
}

export interface StrictTableCellContentProps {
  type?: 'content' | 'meta' | 'title';

  /** Truncate the cell Content with Ellipsis */
  truncate?: boolean;
}
