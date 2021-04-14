import * as React from 'react';


export interface PortalProps extends StrictPortalProps {
  [key: string]: any;
}

export interface StrictPortalProps {
  /** Primary Portal Content */
  children?: React.ReactNode;

  /** Controls if the Portal should close when document is clicked */
  closeOnDocumentClick?: boolean;

  /** Controls if the Portal should close when escape key is pressed */
  closeOnEscape?: boolean;

  /** Controls if then Portal should close when mousing out of the portal */
  closeOnPortalMouseLeave?: boolean;

  /** Controls if the Portal should close on blur of the trigger */
  closeOnTriggerBlur?: boolean;

  /** Controls if the Portal should close on trigger click */
  closeOnTriggerClick?: boolean;

  /** Controls if the Portal should close on mousing out of the trigger */
  closeOnTriggerMouseLeave?: boolean;

  /** Initial open value */
  defaultOpen?: boolean;

  /** The node where the portal should mount */
  mountNode?: HTMLElement;

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay?: number;

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay?: number;

  /** Called when a close event happens */
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Called when the Portal is mounted on DOM */
  onMount?: () => void;

  /** Called when an open event happens */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Called when the portal is unmounted from the DOM */
  onUnmount?: () => void;

  /** Controls if the Porta is displayed */
  open?: boolean;

  /** Controls if the Portal should open on trigger click */
  openOnTriggerClick?: boolean;

  /** Controls if the Portal should open on trigger focus */
  openOnTriggerFocus?: boolean;

  /** Controls if the Portal should open on trigger mouse enter */
  openOnTriggerMouseEnter?: boolean;

  /** The element to be rendered in-place where the portal is defined */
  trigger?: React.ReactElement;

  /** Called with a ref to the trigger node */
  triggerRef?: React.Ref<HTMLElement>;
}
