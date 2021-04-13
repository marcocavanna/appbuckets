import * as React from 'react';

import { PortalProps } from '@appbuckets/react-ui-core';

import { Placement, Rect } from '@popperjs/core';
import { Modifier, StrictModifierNames } from 'react-popper';

import { AppBucketsComponentProps, ShorthandItem } from '../generic';

import { HeaderProps } from '../Header';


export type PopperOffsetFunction = (data: {
  popper: Rect,
  reference: Rect,
  placement: Placement
}) => [ number, number ];

export type PopupOpenEvent = 'hover' | 'click' | 'focus';

export type PopupPosition =
  | 'auto'
  | 'auto start'
  | 'auto end'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'left center'
  | 'right center'
  | 'top center'
  | 'bottom center';


export interface PopupProps extends AppBucketsComponentProps<StrictPopupProps> {

}

export interface StrictPopupProps {
  /** Simplify Tooltip */
  basic?: boolean;

  /** Content Shorthand */
  content?: ShorthandItem<HeaderProps>;

  /** Disable Popup Display */
  disabled?: boolean;

  /** Hide Popup on Document Scroll */
  hideOnScroll?: boolean;

  /** The close delay used to hide popup after scrolling */
  hideOnScrollDelay?: number;

  /** Do not close Popup Element on Mouse Over */
  hoverable?: boolean;

  /** Invert Popup Style */
  inverted?: boolean;

  /** Popup Offset */
  offset?: PopperOffsetFunction | [ number, number ];

  /** On Close Handler */
  onClose?: (event: React.MouseEvent<HTMLElement>, props: PopupProps) => void;

  /** On Mount Event Handler */
  onMount?: (nothing: null, props: PopupProps) => void;

  /** On Open Event Handler */
  onOpen?: (event: React.MouseEvent<HTMLElement>, props: PopupProps) => void;

  /** On Unmount Event Handler */
  onUnmount?: (nothing: null, props: PopupProps) => void;

  /** Open Triggers Event */
  openOn?: PopupOpenEvent[];

  /** Set Popup Position */
  position?: PopupPosition;

  /** Set Popper Modifier */
  popperModifiers?: ReadonlyArray<Modifier<StrictModifierNames>>;

  /** Add properties to Portal */
  portalProps?: PortalProps;

  /** An array of dependencies to force popper update */
  updateDependencies?: any[];

  /** The trigger element */
  trigger?: React.ReactElement;
}
