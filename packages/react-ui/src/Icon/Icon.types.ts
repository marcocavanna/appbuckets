import type {
  IconName,
  IconPrefix,
  FlipProp,
  RotateProp,
  Transform
} from '@fortawesome/fontawesome-svg-core';

import {
  UIMutableComponentProps,
  AppearanceProps,
  MouseHandler
} from '../generic';


export interface IconProps extends UIMutableComponentProps<StrictIconProps>,
  AppearanceProps {
}

export interface StrictIconProps {
  /** Apply border to icon */
  bordered?: boolean;

  /** Visually disable the icon, this would prevent onClick too */
  disabled?: boolean;

  /** Fit icon width to minimal dimension */
  fitted?: boolean;

  /** Apply a flip to the icon */
  flip?: FlipProp;

  /** Manually specify the icon style */
  iconStyle?: IconPrefix;

  /** Invert Icon */
  inverse?: boolean;

  /** Set as List Item */
  listItem?: boolean;

  /** Handle icon Click event */
  onClick?: IconClickHandler;

  /** Apply an Icon Mask */
  mask?: IconName;

  /** The icon to show */
  name?: IconName;

  /** Apply Pulse Animation */
  pulse?: boolean;

  /** Apply a rotation to icon */
  rotate?: RotateProp;

  /** Draw the Icon in Solid Mode, adding a background */
  solid?: 'circle' | 'rounded' | 'colored circle' | 'colored rounded' | 'inverted circle' | 'inverted rounded';

  /** Apply `spin` animation to icon */
  spin?: boolean;

  /** Apply Transformation */
  transform?: Transform;

  /** Remove icon margin */
  unspaced?: boolean;
}

export type IconClickHandler = MouseHandler<SVGSVGElement, IconProps>;

export type {
  FlipProp as IconFlip,
  IconPrefix,
  IconName,
  RotateProp as IconRotate,
  Transform as IconTransform
};
