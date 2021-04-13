import * as React from 'react';

import { FlexContentVerticalAlign, MinimalAppBucketsComponentProps } from '../generic';


export interface BackdropInnerProps extends MinimalAppBucketsComponentProps<StrictBackdropInnerProps> {
}

export interface StrictBackdropInnerProps {
  /** Set the backdrop as animated */
  animated?: boolean;

  /** Handle Click Event */
  onClick?: (event: React.MouseEvent<HTMLElement>, props: BackdropInnerProps) => void;

  /** Handle Click Event occurred outside Backdrop Content, but in Backdrop Area */
  onClickOutside?: (event: React.MouseEvent<HTMLElement>, props: BackdropInnerProps) => void;

  /** Set the content vertical align */
  verticalAlign?: FlexContentVerticalAlign;

  /** Set the backdrop and its content as visible */
  visible?: boolean;
}
