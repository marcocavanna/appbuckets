import * as React from 'react';

import { SliderProps as RCSliderProps } from 'rc-slider';

import { FocusHandler, UIVoidComponentProps, VoidHandler } from '../generic';

import { StrictFieldProps } from '../Field';


type OverriddenSliderProps = 'onBeforeChange' | 'onBlur' | 'onChange' | 'onAfterChange' | 'onFocus';

export interface SliderProps extends UIVoidComponentProps<StrictSliderProps> {

}

export interface StrictSliderProps extends StrictFieldProps, Omit<RCSliderProps<number>, OverriddenSliderProps> {
  /** Called after slider value change */
  onAfterChange?: SliderChangeHandler;

  /** Called before slider change */
  onBeforeChange?: SliderChangeHandler;

  /** Called on slider blur event occurred */
  onBlur?: SliderFocusHandler;

  /** Called every time slider change */
  onChange?: SliderChangeHandler;

  /** Called on slider focus event occurred */
  onFocus?: SliderFocusHandler;

  /** Show Tooltip on Mouse Over, pass a function to format value */
  tooltip?: boolean | SliderValueFormatter;
}

export type SliderChangeHandler = VoidHandler<SliderProps>;

export type SliderFocusHandler = FocusHandler<HTMLDivElement, SliderProps>;

export type SliderValueFormatter = ((value: number) => React.ReactNode);
