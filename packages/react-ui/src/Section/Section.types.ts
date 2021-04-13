import {
  AppBucketsComponentProps,
  AppBucketsIcon,
  ShorthandContent
} from '../generic';

import { IconProps } from '../Icon';


export type SectionDirection = 'vertical' | 'horizontal';

export interface SectionProps extends AppBucketsComponentProps<StrictSectionProps> {
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
