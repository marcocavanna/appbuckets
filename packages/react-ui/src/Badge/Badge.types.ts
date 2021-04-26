import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps
} from '../generic';

import { IconProps } from '../Icon';


export interface BadgeProps extends UIMutableComponentProps<StrictBadgeProps>, AppearanceProps {
}

export interface StrictBadgeProps {
  /** Icon shorthand */
  icon?: AppBucketsIcon<IconProps>;
}
