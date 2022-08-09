import * as React from 'react';

import { Props as InputMaskProps } from 'react-input-mask';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { ChangeHandler, MouseHandler, FocusHandler, VoidHandler, UIVoidComponentProps } from '../generic';

import { StrictFieldProps } from '../Field';


export interface InputProps extends UIVoidComponentProps<StrictInputProps, 'input'> {
}

export interface StrictInputProps extends StrictFieldProps {
  /** Default input value */
  defaultValue?: string;

  /** Define input mask */
  masked?: Pick<InputMaskProps, 'mask' | 'alwaysShowMask'> & { maskChar: string };

  /** On Blur Event */
  onBlur?: InputFocusHandler;

  /** On Change Event */
  onChange?: InputChangeHandler;

  /** On Click Event */
  onClick?: InputClickHandler;

  /** On Focus Event */
  onFocus?: InputFocusHandler;

  /** Handler to execute on Submit */
  onSubmit?: InputSubmitHandler;

  /** Ref to Input */
  ref?: React.Ref<HTMLInputElement>;

  /** Auto Select all content on click */
  selectAllOnClick?: boolean;

  /** Render the input as a Text Area */
  textarea?: boolean;

  /** Set text area component props */
  textareaProps?: Pick<TextareaAutosizeProps, 'cacheMeasurements' | 'rows' | 'minRows' | 'maxRows'>;

  /** Limit value to string only */
  value?: string;
}

export type InputFocusHandler = FocusHandler<HTMLInputElement, InputProps>;

export type InputChangeHandler = ChangeHandler<HTMLInputElement, InputProps>;

export type InputClickHandler = MouseHandler<HTMLInputElement, InputProps>;

export type InputSubmitHandler = VoidHandler<InputProps>;
