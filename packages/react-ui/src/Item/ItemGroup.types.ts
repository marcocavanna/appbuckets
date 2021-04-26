import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps } from '../generic';

import { ItemProps } from './Item.types';


export interface ItemGroupProps extends UIMutableComponentProps<StrictItemGroupProps> {
}

export interface StrictItemGroupProps {
  /** Divide child items */
  divided?: boolean;

  /** Items Shorthand */
  items?: ShorthandCollection<ItemProps>;

  /** Relax items, increasing spacing */
  relaxed?: boolean;
}
