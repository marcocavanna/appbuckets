import * as React from 'react';


export type NotificationContainerHorizontalPosition = 'POS_RIGHT' | 'POS_CENTER' | 'POS_LEFT';
export type NotificationContainerVerticalPosition = 'POS_TOP' | 'POS_CENTER' | 'POS_BOTTOM';


export interface NotificationContainerProps {
  /** Add className to tray container to add custom styling */
  className?: string;

  /** Namespace is mandatory */
  namespace: string;

  /** Set horizontal and vertical position of tray */
  position?: {
    horizontal: NotificationContainerHorizontalPosition,
    vertical: NotificationContainerVerticalPosition
  };

  /** The distance in pixels between each toast in the tray */
  spacing?: number;

  /** Custom style object for the tray, eases custom positioning */
  style?: React.CSSProperties;

  /** The default time in ms for toasts in the tray. Can be overridden individually */
  timeout?: number;
}
