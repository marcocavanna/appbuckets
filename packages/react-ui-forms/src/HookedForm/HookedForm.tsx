import * as React from 'react';
import clsx from 'clsx';

import { useForm, SubmitHandler, SubmitErrorHandler, SetValueConfig } from 'react-hook-form';

import Form from '@appbuckets/react-ui/Form';

import { HookedFormProvider } from '../context/HookedForm.context';
import type {
  FieldChangeHandler,
  FieldChangedHandlerCallback,
  HookedFormContext,
  TriggerFieldChanged,
  UseFieldValue
} from '../context/HookedForm.context';

import type { HookedFormProps } from './HookedForm.types';

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
    resolver,
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
    restoreDefaultValuesIfChanged,
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
    criteriaMode    : breakOnFirstError ? 'firstError' : 'all',
    resolver
  });


  // ----
  // Build Classes
  // ----
  const { formState: state, getValues, setValue } = hookFormCtx;
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
  // Default Values Restore
  // ----
  const { reset: resetForm } = hookFormCtx;
  React.useEffect(
    () => {
      /** Check if must reset form state */
      if (restoreDefaultValuesIfChanged) {
        resetForm(defaultValues);
      }
    },
    [ resetForm, defaultValues, restoreDefaultValuesIfChanged ]
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
  // Field Changed Handlers
  // ----
  const changeHandlers = React.useRef<Record<string, FieldChangedHandlerCallback<any>[]>>({});

  const registerChangeHandler = React.useCallback<FieldChangeHandler<any>>(
    (field, handler) => {
      /** Get current ref value */
      const { current: currentHandlers } = changeHandlers;

      /** Create the handler array container if doesn't exists */
      if (!Array.isArray(currentHandlers[field])) {
        currentHandlers[field] = [];
      }

      /** Add the new handler to handlers container */
      currentHandlers[field].push(handler);

      /** Return a function to unregister field handler */
      return () => {
        /** Assert current is not changed */
        if (Array.isArray(currentHandlers[field])) {
          /** Remove the handler */
          currentHandlers[field] = currentHandlers[field].filter((changeHandler) => changeHandler !== handler);
        }
      };
    },
    []
  );

  const triggerFieldChanged = React.useCallback<TriggerFieldChanged<any>>(
    (field, value) => {
      /** Get current handlers */
      const { current: currentHandlers } = changeHandlers;

      /** Check if there are some registered handlers for field change */
      if (currentHandlers[field] && Array.isArray(currentHandlers[field])) {
        /** Fire all change event handlers */
        currentHandlers[field].forEach((handler) => handler(value));
      }
    },
    []
  );


  // ----
  // Field Values Watched
  // ----
  const [ fieldValues, setFieldValues ] = React.useState<Record<string, any>>({});

  const useFieldValue = React.useCallback<UseFieldValue<any>>(
    (field) => {
      /** Register a new handler */
      registerChangeHandler(field, (newValue) => {
        setFieldValues({
          ...fieldValues,
          [field]: newValue
        });
      });

      /** Create a nested function to set the new value */
      const setNewFieldValue = (newValue: any, options?: SetValueConfig) => {
        setValue(field, newValue, options);
      };

      /** Return data */
      return [
        field in fieldValues ? fieldValues[field] : getValues(field),
        setNewFieldValue
      ];
    },
    [ registerChangeHandler, fieldValues, getValues, setValue ]
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
    registerChangeHandler,
    submitButton,
    triggerFieldChanged,
    useFieldValue
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
