import { PortalProps } from '@appbuckets/react-ui-core';

import { MouseHandler, UIComponentStrictProps, VoidHandler } from '../generic';

import { LoaderProps } from '../Loader';

import { StrictBackdropInnerProps } from './BackdropInner.types';


export type BackdropPortalProps =
  'closeOnDocumentClick'
  | 'closeOnEscape'
  | 'openOnTriggerClick'
  | 'openOnTriggerFocus'
  | 'openOnTriggerMouseEnter'
  | 'trigger'
  | 'triggerRef';

export interface BackdropProps extends UIComponentStrictProps<StrictBackdropProps> {
}

export interface StrictBackdropProps extends Pick<PortalProps, BackdropPortalProps>, StrictBackdropInnerProps {
  /** Close backdrop on Click */
  closeOnBackdropClick?: boolean;

  /** Set a Loader as Backdrop Inner Content */
  loading?: boolean;

  /** Manually override Loader Props */
  loaderProps?: LoaderProps;

  /** Callback fired on Backdrop try to close */
  onClose?: BackdropStateChangeHandler;

  /** Callback fired on Backdrop Mount */
  onMount?: BackdropMountChangeHandler;

  /** Callback fired on Backdrop try to open */
  onOpen?: BackdropStateChangeHandler;

  /** Callback fired on Backdrop Unmount */
  onUnmount?: BackdropMountChangeHandler;

  /** Set the backdrop as full page */
  page?: boolean;
}

export type BackdropStateChangeHandler = MouseHandler<HTMLElement, BackdropProps>;

export type BackdropMountChangeHandler = VoidHandler<BackdropProps>;
