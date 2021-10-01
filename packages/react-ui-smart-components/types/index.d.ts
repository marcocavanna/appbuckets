declare module 'butter-toast' {

  import * as React from 'react';

  export type ToastClickHandler = (
    e?: React.MouseEvent,
    toast?: ToastContentProps & RaiseParam,
    dismiss?: ToastClickHandler
  ) => void;

  export interface ToastContentProps extends StrictToastContentProps {
  }

  export interface StrictToastContentProps {
    /** The dismiss function, calling it will remove the notification */
    dismiss?: ToastClickHandler;

    /** The onClick function Handler */
    onClick?: ToastClickHandler;

    /** The Toast ID */
    toastId: string;
  }

  export interface RaiseParam {
    /** Toast Content */
    content: React.ComponentType<ToastContentProps>;

    /** The dismiss function */
    dismiss?: ToastClickHandler;

    /** Namespace to place the Try */
    namespace?: string;

    /** On Click Handler */
    onClick?: ToastClickHandler;

    /** Pause Timeout on Mouse Over */
    pauseOnHover?: boolean;

    /** Sticky tray will ignore the timeout */
    sticky?: boolean;

    /** Tray timeout */
    timeout?: number;
  }

  export type ButterToastHorizontalPosition = 'POS_RIGHT' | 'POS_CENTER' | 'POS_LEFT';
  export type ButterToastVerticalPosition = 'POS_TOP' | 'POS_CENTER' | 'POS_BOTTOM';

  export interface ButterToastProps {
    /** Add className to tray container to add custom styling */
    className?: string;

    /** Scopes the tray under a namespace, useful when multiple trays are present on the page */
    namespace?: string;

    /** Set horizontal and vertical position of tray */
    position?: { horizontal: ButterToastHorizontalPosition, vertical: ButterToastVerticalPosition };

    /** Determines whether the tray should be rendered relative to body or to its parent component. */
    renderInContext?: boolean;

    /** The distance in pixels between each toast in the tray */
    spacing?: number;

    /** Custom style object for the tray, eases custom positioning */
    style?: React.CSSProperties;

    /** The default time in ms for toasts in the tray. Can be overridden individually */
    timeout?: number;
  }

  export interface ButterToast extends React.FunctionComponent<ButterToastProps> {
    /** Tray Position Constant */
    POS_TOP: 'POS_TOP';

    POS_BOTTOM: 'POS_BOTTOM';

    POS_LEFT: 'POS_LEFT';

    POS_RIGHT: 'POS_RIGHT';

    POS_CENTER: 'POS_CENTER';

    /** Raise a Try */
    raise: (config: RaiseParam) => void;
  }

  declare const ButterToast: ButterToast;

  export default ButterToast;
}
