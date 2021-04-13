import {
  AppBucketsComponentProps,
  ShorthandCollection
} from '../generic';

import { LabelProps } from './Label.types';


export interface LabelGroupProps extends AppBucketsComponentProps<StrictLabelGroupProps> {
}

export interface StrictLabelGroupProps {
  /** Labels Shorthand */
  labels?: ShorthandCollection<LabelProps>;
}
