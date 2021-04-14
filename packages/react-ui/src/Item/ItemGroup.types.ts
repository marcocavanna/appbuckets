import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { AppBucketsComponentProps } from '../generic';

import { ItemProps } from './Item.types';


export interface ItemGroupProps extends AppBucketsComponentProps<StrictItemGroupProps> {
}

export interface StrictItemGroupProps {
  /** Divide child items */
  divided?: boolean;

  /** Items Shorthand */
  items?: ShorthandCollection<ItemProps>;

  /** Relax items, increasing spacing */
  relaxed?: boolean;
}
