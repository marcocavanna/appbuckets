import * as React from 'react';

import { SliderProps as RCSliderProps } from 'rc-slider';

import { UIVoidComponentProps } from '../generic';

import { StrictFieldProps } from '../Field';


type OverriddenSliderProps = 'onBeforeChange' | 'onBlur' | 'onChange' | 'onAfterChange' | 'onFocus';

export interface SliderProps extends UIVoidComponentProps<StrictSliderProps> {

}

export interface StrictSliderProps extends StrictFieldProps, Omit<RCSliderProps, OverriddenSliderProps> {
  /** Called after slider value change */
  onAfterChange?: (nothing: null, props: SliderProps) => void;

  /** Called before slider change */
  onBeforeChange?: (nothing: null, props: SliderProps) => void;

  /** Called on slider blur event occurred */
  onBlur?: (e: React.FocusEvent<HTMLDivElement>, props: SliderProps) => void;

  /** Called every time slider change */
  onChange?: (nothing: null, props: SliderProps) => void;

  /** Called on slider focus event occurred */
  onFocus?: (e: React.FocusEvent<HTMLDivElement>, props: SliderProps) => void;

  /** Show Tooltip on Mouse Over, pass a function to format value */
  tooltip?: boolean | ((value: number) => React.ReactNode)
}
