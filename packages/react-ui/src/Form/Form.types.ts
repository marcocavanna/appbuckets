import * as React from 'react';

import { UIComponentProps } from '../generic';


export interface FormProps extends UIComponentProps<StrictFormProps, 'form'> {
}

export interface StrictFormProps {
  /** Disable form submit */
  disabled?: boolean;

  /** On Form Submit handler */
  onSubmit?: FormSubmitHandler;

  /** Ref to form element */
  ref?: React.Ref<HTMLFormElement>;
}

export type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>, props: FormProps) => void;
