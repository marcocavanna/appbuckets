import * as React from 'react';

import { UIComponentProps } from '../generic';


export interface CollapsableState {
  collapse: 'collapsed' | 'collapsing' | 'expanding' | 'expanded';

  style: React.CSSProperties
}

export interface CollapsableProps extends UIComponentProps<StrictCollapsableProps> {
}

export interface StrictCollapsableProps {
  /** Set the Collapsed Height, default to 0 */
  collapsedHeight?: number;

  /** Set default open state */
  defaultOpen?: boolean;

  /** Disabled Collapsable */
  disabled?: boolean;

  /** On Change Event */
  onChange?: (state: CollapsableState) => void;

  /** On Close Change Event */
  onClose?: (state: CollapsableState) => void;

  /** On Open Change Event */
  onOpen?: (state: CollapsableState) => void;

  /** Manual Control Open State */
  open?: boolean;

  /** Skip animation on Collapse Change */
  skipAnimation?: boolean;

  /** The trigger Element */
  trigger?: React.ReactElement;

  /** The trigger Ref */
  triggerRef?: React.MutableRefObject<HTMLElement>;
}
