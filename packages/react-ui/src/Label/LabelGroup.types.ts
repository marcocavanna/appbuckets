import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps } from '../generic';

import { LabelProps } from './Label.types';


export interface LabelGroupProps extends UIMutableComponentProps<StrictLabelGroupProps> {
}

export interface StrictLabelGroupProps {
  /** Labels Shorthand */
  labels?: ShorthandCollection<LabelProps>;
}
