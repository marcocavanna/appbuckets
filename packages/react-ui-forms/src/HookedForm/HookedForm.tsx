import * as React from 'react';
import clsx from 'clsx';

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import Form from '@appbuckets/react-ui/Form';

import { HookedFormContext, HookedFormProvider } from '../context/HookedForm.context';

import { HookedFormProps } from './HookedForm.types';
import HookedFormActions from './HookedFormActions';

import HookedFormContent from './HookedFormContent';


const HookedForm = React.forwardRef<HTMLFormElement, HookedFormProps>((
  props, ref
) => {


  // ----
  // Deconstruct Options
  // ----
  const {
    /** Hook form props */
    autoFocusFirstError,
    breakOnFirstError,
    context,
    defaultValues,
    reValidateOn,
    validateOn,

    /** Strict props */
    actionsWrapper,
    cancelButton,
    children,
    className,
    contentWrapper,
    disabled,
    resetOnCancel,
    submitButton,

    /** UserDefined Handlers */
    onCancel       : userDefinedOnCancelHandler,
    onInvalidSubmit: userDefinedOnInvalidSubmitHandler,
    onSubmit       : userDefinedOnSubmitHandler,
    onSubmitError  : userDefinedOnSubmitErrorHandler,
    onSubmitSuccess: userDefinedOnSubmitSuccessHandler,

    /** Forwarded props to form component */
    ...restFormComponent
  } = props;


  // ----
  // Initialize HookedForm
  // ----
  const hookFormCtx = useForm({
    mode            : validateOn,
    reValidateMode  : reValidateOn,
    defaultValues,
    context,
    shouldFocusError: autoFocusFirstError,
    criteriaMode    : breakOnFirstError ? 'firstError' : 'all'
  });


  // ----
  // Build Classes
  // ----
  const { formState: state } = hookFormCtx;
  const classes = clsx(
    {
      disabled,
      dirty     : state.isDirty,
      submitted : state.isSubmitted,
      submitting: state.isSubmitting,
      valid     : state.isValid && !!state.submitCount,
      invalid   : !state.isValid && !!state.submitCount
    },
    'hooked-form',
    className
  );


  // ----
  // Handler & Submit Wrapper
  // ----
  const handleValidFormSubmit: SubmitHandler<any> = React.useCallback(
    async (values) => {
      try {
        /** Call userDefined onSubmit handler */
        const result = typeof userDefinedOnSubmitHandler === 'function'
          ? await userDefinedOnSubmitHandler(values, hookFormCtx, context || {})
          : undefined;

        /** Call onSubmit Success handler */
        if (typeof userDefinedOnSubmitSuccessHandler === 'function') {
          return await userDefinedOnSubmitSuccessHandler(result, hookFormCtx, context || {});
        }
      }
      catch (error) {
        /** Call error handler */
        if (typeof userDefinedOnSubmitErrorHandler === 'function') {
          return userDefinedOnSubmitErrorHandler(error, hookFormCtx, context || {});
        }
      }
    },
    [
      context,
      hookFormCtx,
      userDefinedOnSubmitErrorHandler,
      userDefinedOnSubmitHandler,
      userDefinedOnSubmitSuccessHandler
    ]
  );

  const handleInvalidFormSubmit: SubmitErrorHandler<any> = React.useCallback(
    async (errors) => {
      if (typeof userDefinedOnInvalidSubmitHandler === 'function') {
        userDefinedOnInvalidSubmitHandler(errors, hookFormCtx, context || {});
      }
    },
    [ context, hookFormCtx, userDefinedOnInvalidSubmitHandler ]
  );

  const wrappedNativeSubmitHandler = React.useCallback(
    () => hookFormCtx.handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit),
    [ handleInvalidFormSubmit, handleValidFormSubmit, hookFormCtx ]
  );

  const handleFormCancel = React.useCallback(
    () => {
      /** Check if form must be reset */
      if (resetOnCancel) {
        hookFormCtx.reset();
      }
      /** Call user defined onCancel handler */
      if (typeof userDefinedOnCancelHandler === 'function') {
        userDefinedOnCancelHandler(hookFormCtx.getValues(), hookFormCtx, context || {});
      }
    },
    [ context, hookFormCtx, resetOnCancel, userDefinedOnCancelHandler ]
  );


  // ----
  // Context Value Builder
  // ----
  const ctxValue: HookedFormContext = {
    ...hookFormCtx,
    handleSubmit: wrappedNativeSubmitHandler,
    actionsWrapper,
    cancelButton,
    contentWrapper,
    defaultValues,
    disabled    : !!disabled,
    handleCancel: handleFormCancel,
    submitButton
  };


  // ----
  // Render Component
  // ----
  return (
    <HookedFormProvider value={ctxValue}>
      <Form
        {...restFormComponent}
        ref={ref}
        className={classes}
        onSubmit={wrappedNativeSubmitHandler()}
      >
        <HookedFormContent>
          {children}
        </HookedFormContent>
        <HookedFormActions />
      </Form>
    </HookedFormProvider>
  );

});

HookedForm.displayName = 'HookedForm';

HookedForm.defaultProps = {
  actionsWrapper   : 'div',
  breakOnFirstError: false,
  contentWrapper   : 'div',
  reValidateOn     : 'onChange',
  validateOn       : 'onSubmit'
} as Partial<HookedFormProps>;

export default HookedForm;
