import { ShorthandCollection, ShorthandItem } from '@appbuckets/react-ui-core';

import {
  AppBucketsComponentProps,
  AppBucketsIcon,
  SharedComponentStateProps
} from '../generic';

import { HeaderSubheaderProps } from './HeaderSubheader.types';
import { HeaderContentProps } from './HeaderContent.types';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';


export interface HeaderProps extends AppBucketsComponentProps<StrictHeaderProps>, SharedComponentStateProps {

}

export interface StrictHeaderProps {
  /** Header Actions Collection, like CTA */
  actions?: ShorthandCollection<ButtonProps>;

  /** Content Shorthand to create Header */
  content?: ShorthandItem<HeaderContentProps>;

  /** Set disabled Style */
  disabled?: boolean;

  /** Set if the header will divide content */
  divided?: boolean;

  /** Display Header Icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Invert header color */
  inverted?: boolean;

  /** Make the Header Solid, adding a Background Color */
  solid?: boolean;

  /** Create Subheader Shorthand */
  subheader?: ShorthandItem<HeaderSubheaderProps>;
}
