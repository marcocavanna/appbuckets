import { IconProps } from '../Icon';

import {
  AppBucketsComponentProps,
  ShorthandItem,
  SharedComponentStateProps,
  SharedFlexboxContentProps, AppBucketsIcon
} from '../generic';

import { TableCellContentProps } from './TableCellContent.types';


export interface TableCellProps extends AppBucketsComponentProps<StrictTableCellProps, 'td'> {
}

export interface StrictTableCellProps extends SharedComponentStateProps,
  Pick<SharedFlexboxContentProps, 'width'> {
  /** Render the Cell as Active */
  active?: boolean;

  /** Cell Content Shorthand */
  content?: ShorthandItem<TableCellContentProps>;

  /** Cell Title Shorthand */
  header?: ShorthandItem<TableCellContentProps>;

  /** Add a Cell Icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Cell Meta Shorthand */
  meta?: ShorthandItem<TableCellContentProps>;

  /** Set the Cell as Selectable */
  selectable?: boolean;

  /** Show all cell content removing ellipsis overflow */
  wrapped?: boolean;
}
