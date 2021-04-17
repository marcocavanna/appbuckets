import * as React from 'react';

import { FlexContentVerticalAlign, MinimalAppBucketsComponentProps } from '../generic';

import { FadeProps } from '../Fade';


export interface BackdropInnerProps extends MinimalAppBucketsComponentProps<StrictBackdropInnerProps> {
}

export interface StrictBackdropInnerProps {
  /** Handle Click Event */
  onClick?: (event: React.MouseEvent<HTMLElement>, props: BackdropInnerProps) => void;

  /** Handle Click Event occurred outside Backdrop Content, but in Backdrop Area */
  onClickOutside?: (event: React.MouseEvent<HTMLElement>, props: BackdropInnerProps) => void;

  /** Callback used once the BackdropInner has completed the fade in animation */
  onEntered?: FadeProps['onEntered'];

  /** Callback used once the BackdropInner has has completed the fade out animation */
  onExited?: FadeProps['onExited'];

  /** Set transition timeout */
  timeout?: FadeProps['timeout'];

  /** Set the content vertical align */
  verticalAlign?: FlexContentVerticalAlign;

  /** Set the backdrop and its content as visible */
  visible?: boolean;
}
