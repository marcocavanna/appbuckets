import * as React from 'react';
import { FormikConfig, FormikHelpers } from 'formik';

import { ShorthandItem } from '../generic';

import { ButtonProps } from '../Button';


export interface FormFormikProps<Values, SubmitResult = any> extends StrictFormFormikProps<Values, SubmitResult>,
  Omit<FormikConfig<Values>, 'children' | 'onSubmit'> {

}

export interface StrictFormFormikProps<Values, SubmitResult> {
  /** The Cancel Button */
  cancelButton?: ShorthandItem<ButtonProps>;

  /** Form content */
  children?: React.ReactNode;

  /** Disable form submit */
  disabled?: boolean;

  /** The element type that will wrap the form actions */
  formActionWrapper?: React.ElementType | React.ComponentType<FormFormikWrapperProps>;

  /** The element type that will wrap the form */
  formContentWrapper?: React.ElementType | React.ComponentType<FormFormikWrapperProps>;

  /** On Cancel function handler */
  onCancel?: FormFormikActionHandler<Values>;

  /** On Submit function handler */
  onSubmit?: FormFormikActionHandler<Values, SubmitResult>;

  /** Called when the submit handler is complete */
  onSubmitCompleted?: FormFormikSubmitComplete<SubmitResult, Values>;

  /** Called when a submit fail */
  onSubmitError?: (error: any, values: Values, helpers: FormikHelpers<Values>) => void;

  /** Reset form on Cancel pressed */
  resetOnCancel?: boolean;

  /** The Submit Button */
  submitButton?: ShorthandItem<ButtonProps>;
}

/**
 * Each Component declared to wrap Form Section are rendered
 * with some default props passed by Form Formik component
 */
export type FormFormikWrapperProps = {
  /** Children to Render */
  children?: React.ReactNode;

  /** Classnames */
  className: string;
};


/**
 * The Form Action Handler, called on submit or
 * cancel button pressed.
 */
export type FormFormikActionHandler<Values, Result = any> = (
  values: Values,
  helpers: FormikHelpers<Values>
) => (Result | Promise<Result>);

export type FormFormikSubmitComplete<SubmitResult = any, Values = any> = (
  result: SubmitResult | undefined,
  values: Values,
  helpers: FormikHelpers<Values>
) => void;
