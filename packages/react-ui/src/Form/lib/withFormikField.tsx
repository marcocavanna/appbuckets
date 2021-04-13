import * as React from 'react';

import {
  useFormikContext
} from 'formik';

import { AnyObject } from '../../generic';

import {
  FormikFieldComponent,
  FormikFieldComponentProps,
  WithFormikFieldConfiguration,
  WrappedComponentInnerProps
} from './withFormikField.types';


/* --------
 * Formik Field Wrapper HOC
 * -------- */
export default function withFormikField<P extends WrappedComponentInnerProps, ValueType = any, DisplayedValue = ValueType>(
  configuration: WithFormikFieldConfiguration<P, ValueType, DisplayedValue>
) {

  /** Get field Configuration and apply defaults */
  const {
    Component,
    computeValue,
    defaultProps,
    displayName,
    onChange: overridenOnChangeHandler,
    overrideProps,
    setTouchedOnChange: defaultSetTouchedOnChange = true
  } = configuration;

  /** Define the Component */
  const FormikField: FormikFieldComponent<P> = <K extends keyof Values,
    Values extends AnyObject = AnyObject>(
    props: React.PropsWithChildren<FormikFieldComponentProps<P>>
  ) => {

    /** Get component Props */
    const {
      name,
      validate,
      setTouchedOnChange : localSetTouchOnChange,
      onChange           : localOnChangeHandler,
      onBlur             : localOnBlurHandler,
      getErrorOnSubmitted: localGetErrorOnSubmitted = true,
      getErrorOnTouched  : localGetErrorOnTouched = false,
      ...componentRestProps
    } = {
      ...overrideProps,
      ...props,
      ...defaultProps
    };


    /* --------
     * Init the Hook to use Formik
     * -------- */
    const formik = useFormikContext<Values>();


    /* --------
     * Lifecycle Events to Register formik Field
     * -------- */
    React.useEffect(
      () => {
        /** Register the new Field */
        formik.registerField(name as string, { validate });

        /** Unregister form field on component unmount */
        return () => {
          formik.unregisterField(name as string);
        };
      },
      [
        formik,
        formik.registerField,
        formik.unregisterField,
        name,
        validate
      ]
    );


    /* --------
     * Build Component Props
     * -------- */
    const {
      name    : formikFieldName,
      onBlur  : formikBlurHandler,
      onChange: formikChangeHandler,
      value,
      ...formikFieldRest
    } = formik.getFieldProps<Values[K]>({ name, ...componentRestProps });


    /* --------
     * Meta Props Definition
     * -------- */
    const meta = formik.getFieldMeta<Values[K]>(formikFieldName);


    /* --------
     * Field Handlers
     * -------- */
    const handleFieldChange = React.useCallback(
      (event: React.FormEvent<HTMLElement>, componentPropsFromEvent: P, ...restArgs) => {
        /** Check if field must be set as touched on change */
        if ((defaultSetTouchedOnChange || localSetTouchOnChange) && !meta.touched) {
          formik.setFieldTouched(formikFieldName, true, false);
        }

        /** Check which handler must be used */
        if (overridenOnChangeHandler) {
          overridenOnChangeHandler(formik, event, {
            ...formikFieldRest,
            name: formikFieldName,
            value,
            ...componentPropsFromEvent
          }, meta);
        }
        /** Else, fire the original formik handler */
        else {
          formikChangeHandler(event);
        }

        /** Fire the Local onChange handler */
        if (localOnChangeHandler) {
          localOnChangeHandler(event, componentPropsFromEvent, ...restArgs);
        }
      },
      [
        localSetTouchOnChange,
        meta,
        localOnChangeHandler,
        formik,
        formikFieldName,
        formikFieldRest,
        value,
        formikChangeHandler
      ]
    );

    const handleFieldBlur = React.useCallback(
      (event: React.FocusEvent, componentPropsFromEven: P, ...restArgs) => {
        /** Fire Formik original blur handler */
        formikBlurHandler(event);

        /** Set the field has touched */
        if (!meta.touched) {
          formik.setFieldTouched(formikFieldName, true, true);
        }

        /** Fire the local blur handler */
        if (localOnBlurHandler) {
          localOnBlurHandler(event, componentPropsFromEven, ...restArgs);
        }
      },
      [ formikBlurHandler, meta.touched, localOnBlurHandler, formik, formikFieldName ]
    );


    /* --------
     * Check if Value must be computed
     * -------- */
    const fieldValue = React.useMemo<DisplayedValue>(
      () => {
        if (computeValue) {
          return computeValue(value, {
            ...formikFieldRest,
            ...(props as unknown as P),
            name: formikFieldName
          });
        }
        return value;
      },
      [ formikFieldName, formikFieldRest, props, value ]
    );


    /** Check if must show error */
    const showError: boolean = (
      (localGetErrorOnTouched) && meta.touched
    ) || (
      (localGetErrorOnSubmitted) && formik.submitCount > 0
    );


    /* --------
     * Render the Component
     * -------- */
    return (
      <Component
        meta={meta}
        state={{
          danger      : !!((showError && meta.error) || props.danger),
          isSubmitting: formik.isSubmitting,
          message     : showError ? meta.error : undefined,
          success     : props.success,
          warning     : props.warning
        }}
        rest={{
          ...props,
          name,
          onBlur  : handleFieldBlur,
          onChange: handleFieldChange,
          value   : fieldValue
        }}
      />
    );

  };

  /** Define the component props */
  FormikField.displayName = displayName ?? 'FormikField';

  return FormikField;

}
