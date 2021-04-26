import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { FlexboxContainerProps, UIMutableComponentProps } from '../generic';

import { ColumnProps } from '../Column';


export interface RowProps extends UIMutableComponentProps<StrictRowProps> {
}

export interface StrictRowProps extends FlexboxContainerProps {
  /** Columns Content Shorthand */
  columns?: ShorthandCollection<ColumnProps>;
}
