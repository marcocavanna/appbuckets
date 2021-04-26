import * as React from 'react';

import { UIMutableComponentProps } from '../generic';


export interface StickyProps extends UIMutableComponentProps<StrictStickyProps> {

}

export interface StrictStickyProps {
  /** Set the bottom offset */
  bottomOffset?: number;

  /** Disable the sticky */
  disabled?: boolean;

  /** Disable the compensation */
  disableCompensation?: boolean;

  /** Disable hardware acceleration */
  disableHardwareAcceleration?: boolean;

  /** On sticky state change handler */
  onStickyStateChange?: (isSticky: boolean) => void;

  /** User defined style */
  style?: React.CSSProperties;

  /** Set the top offset */
  topOffset?: number;
}
