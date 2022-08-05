import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps,
  MouseHandler
} from '../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../Header';
import { IconProps } from '../Icon';


export interface HeroButtonProps extends UIMutableComponentProps<StrictHeroButtonProps>, AppearanceProps {
}

export interface StrictHeroButtonProps {
  /** An active Hero Button has is appearance color static */
  active?: boolean;

  /** Button main content */
  content?: ShorthandItem<HeaderContentProps>;

  /** A disabled Hero Button is not clickable */
  disabled?: boolean;

  /** Discreet Hero Button will place its appearance color only to text and icon */
  discreet?: boolean;

  /** An icon to Show */
  icon?: AppBucketsIcon<IconProps>;

  /** On Click Handler */
  onClick?: HeroButtonClickHandler;

  /** Button Subheader */
  subheader?: ShorthandItem<HeaderSubheaderProps>;

  /** A variation index number to change appearance, useful when using inside a map */
  variation?: number;
}

export type HeroButtonClickHandler = MouseHandler<HTMLElement, HeroButtonProps>;
