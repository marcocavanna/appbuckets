import * as React from 'react';

import { UIComponentProps } from '../generic';


export interface CollapsableState {
  collapse: 'collapsed' | 'collapsing' | 'expanding' | 'expanded';

  style: React.CSSProperties;
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
  onChange?: CollapseStateChangeHandler;

  /** On Close Change Event */
  onClose?: CollapseStateChangeHandler;

  /** On Open Change Event */
  onOpen?: CollapseStateChangeHandler;

  /** Manual Control Open State */
  open?: boolean;

  /** Skip animation on Collapse Change */
  skipAnimation?: boolean;

  /** The trigger Element */
  trigger?: React.ReactElement;

  /** The trigger Ref */
  triggerRef?: React.MutableRefObject<HTMLElement>;
}

export type CollapseStateChangeHandler = (state: CollapsableState) => void;
