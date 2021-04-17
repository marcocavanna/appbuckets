import * as React from 'react';

import { TransitionProps } from 'react-transition-group/Transition';

import { TransitionUtilsProps } from '@appbuckets/react-ui-styles';


type TransitionHandlerKeys =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';

type TransitionHandlerProps = Pick<TransitionProps, TransitionHandlerKeys>;

export interface FadeProps extends StrictFadeProps {

}


export interface StrictFadeProps extends TransitionUtilsProps, TransitionHandlerProps {
  /**
   * Normally a component is not transitioned if it is shown when the
   * `<Transition>` component mounts. If you want to transition on the first
   * mount set  appear to true, and the component will transition in as soon
   * as the `<Transition>` mounts. Note: there are no specific "appear" states.
   * appear only adds an additional enter transition.
   */
  appear?: boolean;

  /** Children is limited to one element only */
  children?: React.ReactElement & React.RefAttributes<any>;

  /** Mount component on enter */
  mountOnEnter?: boolean;

  /** Forwarded Ref */
  ref?: React.Ref<HTMLElement>;

  /** Visible, if `true` component will appear */
  visible?: boolean;

  /** Unmount component on exit */
  unMountOnExit?: boolean;
}
