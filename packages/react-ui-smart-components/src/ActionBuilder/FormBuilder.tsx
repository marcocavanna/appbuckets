import * as React from 'react';

import realyFastDeepClone from 'rfdc';

import type { ValidationError } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import type { AnyObject } from '@appbuckets/react-ui-core';

import Modal from '@appbuckets/react-ui/Modal';

import HookedForm from '@appbuckets/react-ui-forms/HookedForm';
import type { UseFormReturn } from '@appbuckets/react-ui-forms';
import type {
  HookedFormCancelHandler,
  HookedFormSubmitHandler
} from '@appbuckets/react-ui-forms/HookedForm';

import QuerySuspenseError from '../QuerySuspenseError';

import type {
  FormActionHelpers,
  FormActions,
  FormBuilderConfig,
  FormComponent,
  FormComponentProps
} from './FormBuilder.types';

import useActionBuilder from './lib/useActionBuilder';
import useActionNotification from './lib/useActionNotifications';

import assertUniqueActionBuiltName from './utils/assertUniqueActionBuiltName';
import defaultValuesFromYupSchema from './utils/defaultValuesFromYupSchema';


/* --------
 * Create a data cloner
 * -------- */
const dataCloner = realyFastDeepClone({ circles: false, proto: false });


/* --------
 * Builder Function Definition
 * -------- */
export default function buildFormAction<Dto extends AnyObject, Props extends {}, Result>(
  configuration: FormBuilderConfig<Dto, Props, Result>
): FormComponent<Dto, Props, Result> {

  // ----
  // Deconstruct base configuration object
  // ----
  const {
    // Strict
    // Content Element
    Content    : FormContent,
    displayName: defaultDefinedDisplayName,

    // Buttons
    cancelButton: defaultDefinedCancelButton,
    submitButton: defaultDefinedSubmitButton,

    // Action Notification
    toast: defaultDefinedToastSettings,

    // Local
    // Props Builder
    defaultProps : defaultPropsBuilder,
    overrideProps: overridePropsBuilder,

    // Schema and Form
    extendValidation,
    parseData: parseDataFn,
    schema   : yupSchemaBuilder,
    stripUnknown
  } = configuration;


  // ----
  // Check multiple displayName in development mode only
  // ----
  assertUniqueActionBuiltName(defaultDefinedDisplayName, 'form');


  // ----
  // Define the Built Component
  // ----
  const Form: FormComponent<Dto, Props, Result> = (userDefinedProps) => {

    // ----
    // Extract useful props from userDefinedProps
    // ----
    const {
      isEditing: forcedUserDefinedEditingMode
    } = userDefinedProps;


    // ----
    // Computed the isEditing props
    // ----
    const couldBeEditing: boolean = React.useMemo(
      () => (
        typeof userDefinedProps.defaultValues === 'object'
        && userDefinedProps.defaultValues !== null
        && !Array.isArray(userDefinedProps.defaultValues)
        && !!Object.keys(userDefinedProps.defaultValues).length
      ),
      [ userDefinedProps.defaultValues ]
    );

    const isEditing = typeof forcedUserDefinedEditingMode === 'boolean'
      ? forcedUserDefinedEditingMode
      : couldBeEditing;


    // ----
    // Build Component Props
    // ----

    /** Compute default props */
    const defaultProps = typeof defaultPropsBuilder === 'function'
      ? defaultPropsBuilder({ ...userDefinedProps, isEditing })
      : defaultPropsBuilder;

    /** Compute override props */
    const overrideProps = typeof overridePropsBuilder === 'function'
      ? overridePropsBuilder({ ...defaultProps, ...userDefinedProps, isEditing })
      : overridePropsBuilder;

    /** Merge all props into a single props object */
    const props: FormComponentProps<Dto, Props, Result> = {
      ...defaultProps,
      ...userDefinedProps,
      ...overrideProps
    };


    // ----
    // Deconstruct Props
    // ----
    const {
      // Buttons
      cancelButton: userDefinedCancelButton,
      submitButton: userDefinedSubmitButton,

      // Modal Props
      modal     : renderAsModal,
      modalProps: userDefinedModalProps,

      // Form Props
      defaultValues: userDefinedDefaultValues
    } = props;


    // ----
    // Hooks and State Definition
    // ----
    const {
      actionHelpers,
      couldRenderActionButton,
      open,
      handleModalOpen,
      handleModalClose,
      trigger,
      onCancel,
      onCompleted,
      onSubmit,
      onSubmitError
    } = (
      // eslint-disable-next-line max-len
      useActionBuilder<FormComponent<Dto, Props, Result>, FormActions<Dto, Props, Result>, FormBuilderConfig<Dto, Props, Result>, FormComponentProps<Dto, Props, Result>>(
        configuration,
        props
      )
    );

    const notify = useActionNotification(actionHelpers.toast, {
      onCanceled : defaultDefinedToastSettings?.onCanceled,
      onError    : defaultDefinedToastSettings?.onError,
      onSubmitted: isEditing
        ? defaultDefinedToastSettings?.onEditingSubmit
        : defaultDefinedToastSettings?.onCreatingSubmit
    });


    // ----
    // Build Schema and initial defaultValues
    // ----
    const [ schema ] = React.useState(() => (
      typeof yupSchemaBuilder === 'function'
        ? yupSchemaBuilder({ ...props, isEditing })
        : yupSchemaBuilder
    ));

    /** Default values are computed once only */
    const [ defaultValues ] = React.useState<Dto>(() => {
      /** Editing mode will clone default values to loose object reference while editing data */
      if ((isEditing && couldBeEditing) || couldBeEditing) {
        /** Clone data */
        const clonedData = dataCloner(userDefinedDefaultValues);
        /** Use the parse function if exists */
        const parsedData = (
          typeof parseDataFn === 'function'
            ? parseDataFn(clonedData, { ...props, isEditing })
            : clonedData
        );
        /** Return casted data using yup schema */
        return (
          stripUnknown
            ? schema.noUnknown().cast(parsedData)
            : schema.cast(parsedData)
        );
      }
      /** Else, if form is not in editing mode, build a default object starting from yup schema */
      return defaultValuesFromYupSchema<Dto>(schema);
    });


    // ----
    // Utilities
    // ----
    const isFormValid = React.useCallback(
      async (data: Dto, helpers: UseFormReturn<Dto>): Promise<boolean> => {
        try {
          /** Await form validation */
          await schema.validate(data);
          /** Return form is valid */
          return true;
        }
        catch (error) {
          /** Get data from Validation Error */
          const {
            message: errorMessage,
            path   : errorPath
          } = error as ValidationError;
          /** Set error on form */
          helpers.setError(
            errorPath as any,
            { message: errorMessage, shouldFocus: true }
          );
          /** Return form is invalid */
          return false;
        }
      },
      [ schema ]
    );


    // ----
    // Handlers
    // ----
    const handleSubmit: HookedFormSubmitHandler<Dto, Result, any> = async (data, helpers) => {
      /** Wrap helpers */
      const formActionHelpers: FormActionHelpers<Dto> = {
        ...actionHelpers,
        form: helpers
      };

      /** Check if form must be revalidate on submit */
      if (extendValidation) {
        const isValid = await isFormValid(data, helpers);
        if (!isValid) {
          return undefined as unknown as Result;
        }
      }

      try {
        /** Build definitive data to use */
        const dataToSend = (stripUnknown ? schema.noUnknown().cast(data) : schema.cast(data)) as Dto;

        /** Init a variable to store the result */
        let result: Result | undefined;

        /** Check if an onSubmit function exists and fire it */
        if (typeof onSubmit === 'function') {
          /** Await the result */
          result = await onSubmit(dataToSend, formActionHelpers, { ...props, isEditing });
        }

        /** Check if an onComplete function exists and fire it */
        if (typeof onCompleted === 'function') {
          /** Await function completion */
          await onCompleted(result as Result, data, formActionHelpers, { ...props, isEditing });
        }

        /** Raise the Submitted Notification */
        notify.raiseOnSubmitted();

        /** If has been rendered as modal, close it */
        if (renderAsModal) {
          handleModalClose(null, { ...userDefinedModalProps });
        }

        return result as Result;
      }
      catch (error) {
        /** Raise the onError notification */
        notify.raiseOnError(error);

        /** Check if a catch error function has been defined */
        if (typeof onSubmitError === 'function') {
          try {
            /** Await catch error function */
            await onSubmitError(error, data, formActionHelpers, { ...props, isEditing });
          }
          catch (catchFunctionError) {
            /** Log error in development mode only */
            if (process.env.NODE_ENV === 'development') {
              global.console.warn(
                '[ @appbuckets/react-ui-smart-components ] : an error occurred on onSubmitError handler.',
                catchFunctionError
              );
            }
          }
        }

        return undefined as unknown as Result;
      }
    };

    const handleCancel: HookedFormCancelHandler<Dto, any> = async (data, helpers) => {
      /** Wrap helpers */
      const formActionHelpers: FormActionHelpers<Dto> = {
        ...actionHelpers,
        form: helpers
      };

      try {
        /** Check if a Cancel Function exists */
        if (typeof onCancel === 'function') {
          /** Fire the onCancel Handler */
          await onCancel(formActionHelpers, { ...props, isEditing });
        }
        /** Close the Modal is Confirm is rendered as it */
        if (renderAsModal) {
          handleModalClose(null, userDefinedModalProps || {});
        }
        /** Raise the onCanceled Notification */
        notify.raiseOnCanceled();
      }
      catch (error) {
        /** Log error in development mode only */
        if (process.env.NODE_ENV === 'development') {
          global.console.warn(
            '[ @appbuckets/react-ui-smart-components ] : an error occurred on onCancel handler.',
            error
          );
        }
      }
    };


    // ----
    // Build the Form Element
    // ----
    const formElement = (
      <HookedForm
        actionsWrapper={renderAsModal ? Modal.Actions : 'div'}
        contentWrapper={renderAsModal ? Modal.Content : 'div'}
        submitButton={(
          couldRenderActionButton(userDefinedSubmitButton, defaultDefinedSubmitButton)
            ? (userDefinedSubmitButton || defaultDefinedSubmitButton)
            : null
        )}
        cancelButton={(
          couldRenderActionButton(userDefinedCancelButton, defaultDefinedCancelButton)
            ? (userDefinedCancelButton || defaultDefinedCancelButton)
            : null
        )}
        defaultValues={defaultValues}
        onSubmit={handleSubmit as any}
        onCancel={handleCancel as any}
        resolver={yupResolver(schema)}
      >
        {actionHelpers.error && <QuerySuspenseError {...actionHelpers.error} />}
        {FormContent && <FormContent {...props} />}
      </HookedForm>
    );


    // ----
    // Render Component as plain element
    // ----
    if (!renderAsModal) {
      return formElement;
    }


    // ----
    // Render Component as modal element
    // ----
    return (
      <Modal
        {...userDefinedModalProps}
        open={open}
        onOpen={handleModalOpen}
        onClose={handleModalClose}
        trigger={trigger}
      >
        {formElement}
      </Modal>
    );

  };


  // ----
  // Set the Display Name
  // ----
  Form.displayName = defaultDefinedDisplayName;


  // ----
  // Return the Component
  // ----
  return Form;

}
