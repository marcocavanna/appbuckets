import * as React from 'react';

import { PortalProps, ShorthandItem } from '@appbuckets/react-ui-core';

import { Placement, Rect } from '@popperjs/core';
import { Modifier, StrictModifierNames } from 'react-popper';

import { MouseHandler, UIMutableComponentProps, VoidHandler } from '../generic';

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


export interface PopupProps extends UIMutableComponentProps<StrictPopupProps> {

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
  onClose?: PopupStateChangeHandler;

  /** On Mount Event Handler */
  onMount?: PopupMountChangeHandler;

  /** On Open Event Handler */
  onOpen?: PopupStateChangeHandler;

  /** On Unmount Event Handler */
  onUnmount?: PopupMountChangeHandler;

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

export type PopupStateChangeHandler = MouseHandler<HTMLElement, PopupProps>;

export type PopupMountChangeHandler = VoidHandler<PopupProps>;
