import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { AppBucketsComponentProps } from '../generic';

import { LabelProps } from './Label.types';


export interface LabelGroupProps extends AppBucketsComponentProps<StrictLabelGroupProps> {
}

export interface StrictLabelGroupProps {
  /** Labels Shorthand */
  labels?: ShorthandCollection<LabelProps>;
}
