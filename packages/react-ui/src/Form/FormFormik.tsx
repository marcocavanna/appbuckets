import * as React from 'react';
import { Formik, FormikProps } from 'formik';

import { useWithDefaultProps } from '../BucketTheme';

import Button from '../Button';
import type { ButtonProps } from '../Button';

import Form from './Form';

import { FormFormikActionHandler, FormFormikProps } from './FormFormik.types';


/* --------
 * Internal Type used to Describe Internal Component
 * -------- */
type FormFormikInternalActionHandler<Values> = (
  e: React.MouseEvent,
  buttonProps: ButtonProps,
  formikBag: FormikProps<Values>
) => void;

type FormFormikComponentProps<Values> = Omit<FormFormikProps<Values>, 'onCancel' | 'onSubmit'> & {
  formikBag: FormikProps<Values>;
  onCancel?: FormFormikInternalActionHandler<Values>;
};


/* --------
 * Render the Formik Inner Actions
 * -------- */
function FormFormikActions<Values = any>(
  props: FormFormikComponentProps<Values>
): React.ReactElement<FormFormikComponentProps<Values>> | null {

  const {
    formActionWrapper: ActionWrapper,
    submitButton,
    cancelButton,
    onCancel,
    formikBag
  } = props;


  /* --------
   * Build Memoized Components
   * -------- */
  const submitButtonElement = React.useMemo(
    () => Button.create(submitButton, {
      autoGenerateKey: false,
      defaultProps   : {
        className: 'submit',
        primary  : true,
        loading  : formikBag.isSubmitting
      },
      overrideProps  : {
        disabled: formikBag.isSubmitting,
        type    : 'submit'
      }
    }),
    [
      submitButton,
      formikBag.isSubmitting
    ]
  );

  const cancelButtonElement = React.useMemo(
    () => Button.create(cancelButton, {
      autoGenerateKey: false,
      defaultProps   : {
        className: 'cancel'
      },
      overrideProps  : (originalProps => ({
        disabled: formikBag.isSubmitting,
        type    : 'button',
        onClick : (e, buttonProps) => {
          /** Call Initial onClick handler */
          if (originalProps.onClick) {
            originalProps.onClick(e, buttonProps);
          }
          /** Call the onCancel form Handler */
          if (onCancel) {
            onCancel(e, buttonProps, formikBag);
          }
        }
      }))
    }),
    [ cancelButton, formikBag, onCancel ]
  );

  /** Case of no Action Wrapper, return an empty component */
  if (!ActionWrapper) {
    return null;
  }

  return (
    <ActionWrapper className={'form-actions'}>
      {cancelButtonElement}
      {submitButtonElement}
    </ActionWrapper>
  );
}


/* --------
 * Render the Formik Inner Content
 * -------- */
function FormFormikContent<Values = any>(
  props: FormFormikComponentProps<Values>
): React.ReactElement<FormFormikComponentProps<Values>> | null {

  const {
    formContentWrapper: ContentWrapper,
    children
  } = props;

  if (!ContentWrapper) {
    return null;
  }

  return (
    <ContentWrapper className={'form-content'}>
      {children}
    </ContentWrapper>
  );
}


/* --------
 * Render the Form Formik Outer Wrapper
 * -------- */
export default function FormFormik<Values = any, SubmitResult = any>(
  receivedProps: FormFormikProps<Values, SubmitResult>
): React.ReactElement<FormFormikProps<Values, SubmitResult>> {

  const props = useWithDefaultProps('formFormik', receivedProps);

  const {
    /** Strict FormFormik Props */
    children,
    cancelButton,
    disabled,
    submitButton,
    formActionWrapper : ActionWrapper,
    formContentWrapper: ContentWrapper,
    onCancel,
    onSubmit,
    onSubmitCompleted,
    onSubmitError,
    resetOnCancel,

    /** All other formik props */
    ...formikProps
  } = props;


  /* --------
   * Component Handlers
   * -------- */
  const handleFormSubmit = React.useCallback<FormFormikActionHandler<Values>>(
    async (values, helpers) => {
      try {
        const result = typeof onSubmit === 'function'
          ? await onSubmit(values, helpers)
          : undefined;

        helpers.setSubmitting(false);

        if (onSubmitCompleted) {
          onSubmitCompleted(result, values, helpers);
        }
      }
      catch (error) {
        helpers.setSubmitting(false);

        /** Call the error handler */
        if (onSubmitError) {
          onSubmitError(error, values, helpers);
        }
      }
    },
    [ onSubmit, onSubmitCompleted, onSubmitError ]
  );

  const handleFormikCancel = React.useCallback<FormFormikInternalActionHandler<Values>>(
    (e, buttonProps, formikBag) => {
      /** Check if must reset form on cancel press */
      if (resetOnCancel) {
        formikBag.resetForm();
      }
      /** Call user defined handlers */
      if (onCancel) {
        onCancel(formikBag.values, {
          setStatus      : formikBag.setStatus,
          setErrors      : formikBag.setErrors,
          setSubmitting  : formikBag.setSubmitting,
          setTouched     : formikBag.setTouched,
          setValues      : formikBag.setValues,
          setFieldError  : formikBag.setFieldError,
          setFieldTouched: formikBag.setFieldTouched,
          setFieldValue  : formikBag.setFieldValue,
          validateField  : formikBag.validateField,
          validateForm   : formikBag.validateForm,
          resetForm      : formikBag.resetForm,
          submitForm     : formikBag.submitForm,
          setFormikState : formikBag.setFormikState
        });
      }
    },
    [ onCancel, resetOnCancel ]
  );


  /* --------
   * Return the Form
   * -------- */
  return (
    <Formik
      {...formikProps}
      onSubmit={handleFormSubmit}
    >
      {formikBag => (
        <Form onSubmit={formikBag.handleSubmit}>
          <FormFormikContent
            {...props}
            onCancel={undefined}
            formikBag={formikBag}
          />

          <FormFormikActions
            {...props}
            onCancel={handleFormikCancel}
            formikBag={formikBag}
          />
        </Form>
      )}
    </Formik>
  );
}

(FormFormik as React.FunctionComponent<FormFormikProps<any>>).displayName = 'FormFormik';
