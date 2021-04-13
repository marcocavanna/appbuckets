import {
  MinimalAppBucketsComponentProps,
  ShorthandCollection
} from '../generic';

import { TableCellProps } from './TableCell.types';
import { TableRowProps } from './TableRow.types';
import { TableHeaderCellProps } from './TableHeaderCell.types';


export interface TableProps<Data = any> extends MinimalAppBucketsComponentProps<StrictTableProps<Data>> {
}

export interface StrictTableProps<Data> {
  /** Compress Spacing between cells and rows */
  compressed?: boolean;

  /** Wrap the Table in a scrollable container */
  responsive?: boolean;

  /** Rows Render Shorthand */
  rows?: TableRenderRows<Data>;

  /** Set the Table as Sortable */
  sortable?: boolean;

  /** Table Data Collection */
  tableData?: Data[];
}

export type TableRenderRows<Data> = {
  /** Collection of Body Rows */
  body?: ShorthandCollection<TableRowProps<TableCellProps>> | ((
    record: Data,
    index: number,
    array: Data[]
  ) => ShorthandCollection<TableCellProps>);
  /** Collection of Footer Rows */
  footer?: ShorthandCollection<TableRowProps<TableCellProps>>;
  /** Collection of Header Rows */
  header?: ShorthandCollection<TableRowProps<TableHeaderCellProps>>;
};
