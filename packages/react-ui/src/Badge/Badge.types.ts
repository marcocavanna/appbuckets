import {
  AppBucketsComponentProps,
  AppBucketsIcon,
  SharedComponentStateProps
} from '../generic';

import { IconProps } from '../Icon';


export interface BadgeProps extends AppBucketsComponentProps<StrictBadgeProps>, SharedComponentStateProps {
}

export interface StrictBadgeProps {
  /** Icon shorthand */
  icon?: AppBucketsIcon<IconProps>;
}
