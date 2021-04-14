import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { AppBucketsComponentProps } from '../generic';
import { ButtonProps } from '../Button';


export interface PanelBodyProps extends AppBucketsComponentProps<StrictPanelBodyProps> {
}

export interface StrictPanelBodyProps {
  /** Panel FAB Collections */
  fab?: ShorthandCollection<ButtonProps>;
}
