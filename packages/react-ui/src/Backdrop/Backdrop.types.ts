import * as React from 'react';
import { PortalProps } from '@appbuckets/react-ui-core';

import { UIComponentStrictProps } from '../generic';

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
  onClose?: (e: React.MouseEvent<HTMLElement>, props: BackdropProps) => void;

  /** Callback fired on Backdrop Mount */
  onMount?: (nothing: null, props: BackdropProps) => void;

  /** Callback fired on Backdrop try to open */
  onOpen?: (e: React.MouseEvent<HTMLElement>, props: BackdropProps) => void;

  /** Callback fired on Backdrop Unmount */
  onUnmount?: (nothing: null, props: BackdropProps) => void;

  /** Set the backdrop as full page */
  page?: boolean;
}
