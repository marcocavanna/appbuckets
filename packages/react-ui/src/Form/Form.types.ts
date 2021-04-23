import * as React from 'react';

import {
  AppBucketsComponentProps
} from '../generic';


export interface FormProps extends AppBucketsComponentProps<StrictFormProps, 'form'> {
}

export interface StrictFormProps {
  /** Disable form submit */
  disabled?: boolean;

  /** On Form Submit handler */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, props: FormProps) => void;

  /** Ref to form element */
  ref?: React.Ref<HTMLFormElement>;
}
