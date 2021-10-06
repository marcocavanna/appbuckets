import * as React from 'react';

import { useMountedState } from '@appbuckets/react-ui-core';

import Box from '@appbuckets/react-ui/Box';
import Button from '@appbuckets/react-ui/Button';
import Header from '@appbuckets/react-ui/Header';
import Modal from '@appbuckets/react-ui/Modal';

import QuerySuspenseError from '../QuerySuspenseError';

import type {
  ConfirmActions,
  ConfirmBuilderConfig,
  ConfirmComponent,
  ConfirmComponentProps,
  ExtensibleConfirmComponent
} from './ConfirmBuilder.types';

import useActionBuilder from './lib/useActionBuilder';
import useActionNotification from './lib/useActionNotifications';


/* --------
 * Weak Map to test DisplayName
 * -------- */
const createdConfirmComponent = new Set<string>();


/* --------
 * Builder Function Definition
 * -------- */
export default function buildConfirmAction<Props extends {}, Result = any>(
  configuration: ConfirmBuilderConfig<Props, Result>
): ExtensibleConfirmComponent<Props, Result> {

  // ----
  // Deconstruct base configuration object
  // ----
  const {
    // Strict
    // Content Element
    Content    : ConfirmContent,
    displayName: defaultDefinedDisplayName,

    // Buttons
    cancelButton: defaultDefinedCancelButton,
    submitButton: defaultDefinedSubmitButton,

    // Action Notification
    toast: defaultDefinedToastSettings,

    // Local
    // Props Builder
    defaultProps : defaultPropsBuilder,
    overrideProps: overridePropsBuilder
  } = configuration;


  // ----
  // Check multiple displayName in development mode only
  // ----
  if (process.env.NODE_ENV === 'development') {
    if (createdConfirmComponent.has(defaultDefinedDisplayName)) {
      global.console.warn(
        `[ @appbuckets/react-ui-smart-components ] : a confirm element has been created with name ${defaultDefinedDisplayName}.`
        + ' This displayName has been already assigned to another ConfirmComponent.'
      );
    }
    createdConfirmComponent.add(defaultDefinedDisplayName);
  }


  // ----
  // Define the Built Component
  // ----
  const Confirm: ExtensibleConfirmComponent<Props, Result> = (userDefinedProps) => {

    // ----
    // Build Component Props
    // ----

    /** Compute default props */
    const defaultProps = typeof defaultPropsBuilder === 'function'
      ? defaultPropsBuilder(userDefinedProps)
      : defaultPropsBuilder;

    /** Compute override props */
    const overrideProps = typeof overridePropsBuilder === 'function'
      ? overridePropsBuilder({ ...defaultProps, ...userDefinedProps })
      : overridePropsBuilder;

    /** Merge all props into a single props object */
    const props: ConfirmComponentProps<Props, Result> = {
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
      modalProps: userDefinedModalProps
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
      useActionBuilder<ConfirmComponent<Props, Result>, ConfirmActions<Props, Result>, ConfirmBuilderConfig<Props, Result>, ConfirmComponentProps<Props, Result>>(
        configuration, props
      )
    );

    const notify = useActionNotification(actionHelpers.toast, {
      ...defaultDefinedToastSettings
    });

    const [ isPerformingAction, setIsPerformingAction ] = useMountedState<boolean>(false);


    // ----
    // Assertion
    // ----
    React.useEffect(
      () => {
        /** Assert isPerformingAction is falsy on open */
        if (renderAsModal && open) {
          setIsPerformingAction(false);
        }
      },
      [ renderAsModal, open, setIsPerformingAction ]
    );


    // ----
    // Handlers
    // ----
    const handleSubmitClick = async (event: React.MouseEvent<HTMLElement>) => {
      try {
        /** Init a variable to store the result */
        let result: Result | null = null;

        /** Change the Internal State */
        setIsPerformingAction(true);

        /** Check if an onSubmit function exists and fire it */
        if (typeof onSubmit === 'function') {
          /** Await the result */
          result = await onSubmit(actionHelpers, props);
        }

        /** Check if an onComplete function exists and fire it */
        if (typeof onCompleted === 'function') {
          /** Await function completion */
          await onCompleted(result as Result, actionHelpers, props);
        }

        /** Raise the Submitted Notification */
        notify.raiseOnSubmitted();

        /** If has been rendered as modal, close it */
        if (renderAsModal) {
          handleModalClose(event, { ...userDefinedModalProps });
        }
        else {
          setIsPerformingAction(false);
        }
      }
      catch (error) {
        /** Raise the onError notification */
        notify.raiseOnError(error);

        /** Check if a catch error function has been defined */
        if (typeof onSubmitError === 'function') {
          try {
            /** Await catch error function */
            await onSubmitError(error, actionHelpers, props);
            /** Restore State */
            setIsPerformingAction(false);
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
          finally {
            /** Restore State */
            setIsPerformingAction(false);
          }
        }
      }
    };

    const handleCancelClick = async (event: React.MouseEvent<HTMLElement>) => {
      try {
        /** Check if a Cancel Function exists */
        if (typeof onCancel === 'function') {
          /** Change the Internal State */
          setIsPerformingAction(true);
          /** Fire the onCancel Handler */
          await onCancel(actionHelpers, props);
        }
        /** Close the Modal is Confirm is rendered as it */
        if (renderAsModal) {
          handleModalClose(event, { ...userDefinedModalProps });
        }
        else {
          setIsPerformingAction(false);
        }
      }
      catch (error) {
        /** Remove the Internal State */
        setIsPerformingAction(false);
        /** Log error in development mode only */
        if (process.env.NODE_ENV === 'development') {
          global.console.warn(
            '[ @appbuckets/react-ui-smart-components ] : an error occurred on onCancel handler.',
            error
          );
        }
      }
      finally {
        /** Raise the onCanceled Notification */
        notify.raiseOnCanceled();
      }
    };


    // ----
    // Buttons Definition
    // ----
    const cancelButton = (() => {
      /** Check if cancel button must be render */
      if (!couldRenderActionButton(userDefinedCancelButton, defaultDefinedCancelButton)) {
        return null;
      }

      /** Return the Button from Shorthand function */
      return Button.create(
        userDefinedCancelButton || defaultDefinedCancelButton,
        {
          autoGenerateKey: false,
          overrideProps  : (subComponentProps) => ({
            disabled: isPerformingAction,
            loading : isPerformingAction,
            onClick : async (event, buttonProps) => {
              /** Check if a user defined onClick handler exists */
              if (typeof subComponentProps.onClick === 'function') {
                subComponentProps.onClick(event, buttonProps);
              }
              /** Handle click cancel button */
              await handleCancelClick(event);
            }
          })
        }
      );
    })();

    const submitButton = (() => {
      /** Check if submit button must be render */
      if (!couldRenderActionButton(userDefinedSubmitButton, defaultDefinedSubmitButton)) {
        return null;
      }

      /** Return the Button from Shorthand function */
      return Button.create(
        userDefinedSubmitButton || defaultDefinedSubmitButton,
        {
          autoGenerateKey: false,
          defaultProps   : {
            primary  : true,
            autoFocus: true,
            type     : 'submit'
          },
          overrideProps  : (subComponentProps) => ({
            disabled: isPerformingAction,
            loading : isPerformingAction,
            onClick : async (event, buttonProps) => {
              /** Check if a user defined onClick handler exists */
              if (typeof subComponentProps.onClick === 'function') {
                subComponentProps.onClick(event, buttonProps);
              }
              /** Handle click confirm button */
              await handleSubmitClick(event);
            }
          })
        }
      );
    })();


    // ----
    // Render Component as plain element
    // ----
    if (!renderAsModal) {
      return (
        <React.Fragment>
          {userDefinedModalProps?.header && (
            Header.create(userDefinedModalProps.header, { autoGenerateKey: false })
          )}
          {ConfirmContent && <ConfirmContent {...props} />}
          {actionHelpers.error && <QuerySuspenseError {...actionHelpers.error} />}
          {(cancelButton || submitButton) && (
            <Box my={4} textAlign={'right'}>
              {cancelButton}
              {submitButton}
            </Box>
          )}
        </React.Fragment>
      );
    }


    // ----
    // Render Component as modal element
    // ----
    return (
      <Modal
        {...userDefinedModalProps}
        closeIcon={null}
        closeOnBackdropClick={false}
        closeOnEscape={false}
        open={open}
        onOpen={handleModalOpen}
        onClose={handleModalClose}
        trigger={trigger}
      >
        {ConfirmContent && <ConfirmContent {...props} />}
        {actionHelpers.error && <QuerySuspenseError {...actionHelpers.error} />}
        {(cancelButton || submitButton) && (
          <Modal.Actions>
            {cancelButton}
            {submitButton}
          </Modal.Actions>
        )}
      </Modal>
    );

  };


  // ----
  // Add the Extension Function
  // ----
  Confirm.extend = <NewProps extends {}, NewResult = any>(newConfig: ConfirmBuilderConfig<NewProps, NewResult>) => (
    buildConfirmAction<NewProps, NewResult>({
      ...configuration,
      ...newConfig
    } as any)
  );


  // ----
  // Set the Display Name
  // ----
  Confirm.displayName = defaultDefinedDisplayName;

  // ----
  // Return the Component
  // ----
  return Confirm;

}
