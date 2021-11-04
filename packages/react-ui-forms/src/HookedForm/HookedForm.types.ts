import * as React from 'react';

import type { AnyObject, ShorthandItem } from '@appbuckets/react-ui/generic';
import type { ButtonProps } from '@appbuckets/react-ui/Button';

import type { FieldValues, UseFormProps, UseFormReturn, FieldErrors } from 'react-hook-form';


/* --------
 * Exported Handlers
 * -------- */
export type HookedFormCancelHandler<Values extends FieldValues, Ctx> = (
  values: Values,
  helpers: UseFormReturn<Values>,
  context: Ctx
) => void | Promise<void>;

export type HookedFormInvalidSubmitHandler<Values extends FieldValues, Ctx> = (
  errors: FieldErrors<Values>,
  helpers: UseFormReturn<Values>,
  context: Ctx
) => void | Promise<void>;

export type HookedFormSubmitHandler<Values extends FieldValues, SubmitReturn, Ctx> = (
  values: Values,
  helpers: UseFormReturn<Values>,
  context: Ctx
) => SubmitReturn | Promise<SubmitReturn>;

export type HookedFormSubmitErrorHandler<Values extends FieldValues, Ctx> = (
  error: any,
  helpers: UseFormReturn<Values>,
  context: Ctx
) => void | Promise<void>;

export type HookedFormSubmitSuccessHandler<Values extends FieldValues, SubmitReturn, Ctx> = (
  result: SubmitReturn,
  helpers: UseFormReturn<Values>,
  context: Ctx
) => void | Promise<void>;


export type HookedFormProps<Values extends FieldValues = FieldValues, SubmitReturn = any, Ctx extends AnyObject = AnyObject> =
  & StrictHookedFormProps<Values, SubmitReturn, Ctx>
  & Omit<JSX.IntrinsicElements['form'], keyof StrictHookedFormProps<Values, SubmitReturn, Ctx>>;


export interface StrictHookedFormProps<Values extends FieldValues, SubmitReturn, Ctx extends AnyObject> {
  /** Element used to wrap form actions */
  actionsWrapper?: React.ElementType;

  /** Auto Focus the first error input on submit */
  autoFocusFirstError?: boolean;

  /** Break onSubmit handler at first error. Set to true to display only one error at time */
  breakOnFirstError?: boolean;

  /** Form Cancel Button */
  cancelButton?: ShorthandItem<ButtonProps>;

  /** User defined classes */
  className?: string;

  /** Element used to wrap form content */
  contentWrapper?: React.ElementType;

  /** A mutable context object that will be injected as second argument on resolver function */
  context?: Ctx;

  /** Inner form components */
  children?: React.ReactNode;

  /** Default values to fill form on first render */
  defaultValues?: UseFormProps<Values, Ctx>['defaultValues'];

  /** Disable entire form */
  disabled?: boolean;

  /** On cancel button click handler */
  onCancel?: HookedFormCancelHandler<Values, Ctx>;

  /** Handler triggered on invalid form submitted */
  onInvalidSubmit?: HookedFormInvalidSubmitHandler<Values, Ctx>;

  /** On submit button click handler */
  onSubmit?: HookedFormSubmitHandler<Values, SubmitReturn, Ctx>;

  /** On submit error handler */
  onSubmitError?: HookedFormSubmitErrorHandler<Values, Ctx>;

  /** Om submit success handler */
  onSubmitSuccess?: HookedFormSubmitSuccessHandler<Values, SubmitReturn, Ctx>;

  /** Forwarded ref of form element */
  ref?: React.Ref<HTMLFormElement>;

  /** Reset entire form on cancel button click */
  resetOnCancel?: boolean;

  /** Validation Resolver */
  resolver?: UseFormProps<Values, Ctx>['resolver'];

  /** Restore values if defaultValues object change */
  restoreDefaultValuesIfChanged?: boolean;

  /** Set the event on revalidation will trigger */
  reValidateOn?: UseFormProps<Values, Ctx>['reValidateMode'];

  /** Form submit button */
  submitButton?: ShorthandItem<ButtonProps>;

  /** Set the event on the first validation will trigger */
  validateOn?: UseFormProps<Values, Ctx>['mode'];
}
