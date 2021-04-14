import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { FlexboxContainer } from '../generic';

import { ColumnProps } from '../Column';


export interface RowProps extends FlexboxContainer<StrictRowProps> {
}

export interface StrictRowProps {
  /** Columns Content Shorthand */
  columns?: ShorthandCollection<ColumnProps>;
}
