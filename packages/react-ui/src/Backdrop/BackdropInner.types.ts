import {
  FlexContentVerticalAlign,
  MouseHandler,
  UIComponentStrictProps
} from '../generic';

import { FadeProps } from '../Fade';


export interface BackdropInnerProps extends UIComponentStrictProps<StrictBackdropInnerProps> {
}

export interface StrictBackdropInnerProps {
  /** Handle Click Event */
  onClick?: BackdropInnerClickHandler;

  /** Handle Click Event occurred outside Backdrop Content, but in Backdrop Area */
  onClickOutside?: BackdropInnerClickHandler;

  /** Callback used once the BackdropInner has completed the fade in animation */
  onEntered?: FadeProps['onEntered'];

  /** Callback used once the BackdropInner is appearing */
  onEntering?: FadeProps['onEntering'];

  /** Callback used once the BackdropInner has has completed the fade out animation */
  onExited?: FadeProps['onExited'];

  /** Callback used once the BackdropInner is disappearing */
  onExiting?: FadeProps['onExiting'];

  /** Set transition timeout */
  timeout?: FadeProps['timeout'];

  /** Set the content vertical align */
  verticalAlign?: FlexContentVerticalAlign;

  /** Set the backdrop and its content as visible */
  visible?: boolean;
}

export type BackdropInnerClickHandler = MouseHandler<HTMLElement, BackdropInnerProps>;
