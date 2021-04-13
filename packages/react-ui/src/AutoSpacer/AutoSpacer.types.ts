import * as React from 'react';


export type AutoSpacerChildComponent = React.ComponentType<AutoSpacerRenderProps>;

export type AutoSpacerRenderProps = {
  /** Current available height */
  height: number;

  /** Current available width */
  width: number;
};

export interface AutoSpacerProps {
  /**
   * Children could be a function that will receive
   * as params the current height and current width.
   * Alternatively, if children is not a valid function
   * the current height and width will be set to
   * auto spacer container div element
   */
  children?: AutoSpacerChildComponent | React.ReactNode;

  /** User defined className added to container */
  className?: string;

  /** The default starting height */
  defaultHeight?: number;

  /** The default starting width */
  defaultWidth?: number;

  /** Disable re render on height change */
  disableHeight?: boolean;

  /** Disable re render on width change */
  disableWidth?: boolean;

  /** Set maximum height */
  maximumHeight?: number;

  /** Set maximum width */
  maximumWidth?: number;

  /** Set minimum height */
  minimumHeight?: number;

  /** Set minimum width */
  minimumWidth?: number;

  /** On Resized event Callback */
  onResize?: (size: AutoSpacerRenderProps) => void;

  /**
   * By default the AutoSpacer won't render children
   * if one of height or width is equal to 0.
   * To avoid this prop could be set to true
   */
  renderIfInvisible?: boolean;

  /** Extra style passed down to container */
  style?: React.CSSProperties;

  /** Subtract from computed Height */
  subtractHeight?: number;

  /** Subtract from computed Width */
  subtractWidth?: number;
}
