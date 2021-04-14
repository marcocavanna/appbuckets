import * as React from 'react';


export interface PortalInnerProps extends StrictPortalInnerProps {
  [key: string]: any;
}

export interface StrictPortalInnerProps {
  /** Primary Content */
  children: React.ReactNode;

  /** Use to get the inner node ref */
  innerRef?: React.Ref<HTMLElement | undefined>;

  /** The node where the Portal should mount */
  mountNode?: HTMLElement;

  /** Called when the PortalInner is mounted on the DOM */
  onMount?: () => void;

  /** Called when the PortalInner is unmounted from the DOM */
  onUnmount?: () => void;
}
