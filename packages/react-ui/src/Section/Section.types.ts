import { ShorthandContent } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon
} from '../generic';

import { IconProps } from '../Icon';


export type SectionDirection = 'vertical' | 'horizontal';

export interface SectionProps extends UIMutableComponentProps<StrictSectionProps> {
}

export interface StrictSectionProps {
  /** Set the Section Direction */
  direction?: SectionDirection;

  /** Add a Divider under the Section */
  divided?: boolean;

  /** Add an Icon to the Label */
  icon?: AppBucketsIcon<IconProps>;

  /** Set the Section Label */
  label?: ShorthandContent;

  /** Reverse the Order of Label and Content */
  reverse?: boolean;
}
