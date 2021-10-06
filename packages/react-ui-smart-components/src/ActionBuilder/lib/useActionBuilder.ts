import * as React from 'react';

import { useAutoControlledValue } from '@appbuckets/react-ui-core';
import type { ShorthandItem } from '@appbuckets/react-ui-core';

import type { ButtonProps } from '@appbuckets/react-ui/Button';
import type { ModalProps } from '@appbuckets/react-ui/Modal';

import { useClient } from '@appbuckets/react-app-client';
import type { ClientRequestError } from '@appbuckets/react-app-client';

import { useSmartComponents } from '../../SmartComponentsProvider';

import type {
  BaseActionHelpers,
  BaseActionBuilderActions,
  BaseActionBuilderConfig,
  BaseActionBuilderProps
} from '../BaseActionBuilder.types';


/* --------
 * Types
 * -------- */
interface BaseUseActionBuilderResult {
  /** Action Helpers to be passed to Action Handlers */
  actionHelpers: BaseActionHelpers;

  /** Current action error */
  actionError: ClientRequestError | undefined;

  /** Check if an Action button could be rendered */
  couldRenderActionButton: (
    userDefinedButton?: ShorthandItem<ButtonProps>,
    defaultDefinedButton?: ShorthandItem<ButtonProps>
  ) => boolean;

  /** Handle modal close, changing open state */
  handleModalClose: (e: React.MouseEvent<HTMLElement>, modalProps: ModalProps) => void;

  /** Handle modal open, changing open state */
  handleModalOpen: (e: React.MouseEvent<HTMLElement>, modalProps: ModalProps) => void;

  /** Current modal state */
  open: boolean;

  /** Current modal trigger */
  trigger: ModalProps['trigger'];
}

type UseActionBuilderResult<Actions extends BaseActionBuilderActions> =
  & BaseUseActionBuilderResult
  & Actions;


/* --------
 * Hook Definition
 * -------- */
export default function useActionBuilder<Content extends React.ComponentType<any>,
  Actions extends BaseActionBuilderActions,
  Config extends BaseActionBuilderConfig<Content, Actions, any>,
  Props extends BaseActionBuilderProps<{}, Actions>>(
  configuration: Config,
  userDefinedProps: Props
): UseActionBuilderResult<Actions> {

  // ----
  // Get from Config
  // ----
  const {
    // Buttons
    trigger: defaultDefinedModalTrigger,

    // Actions
    onCancel     : defaultDefinedCancelHandler,
    onCompleted  : defaultDefinedCompletedHandler,
    onSubmit     : defaultDefinedSubmitHandler,
    onSubmitError: defaultDefinedSubmitErrorHandler
  } = configuration;


  // ----
  // Get from User Defined Props
  // ----
  const {
    // Buttons
    trigger: userDefinedModalTrigger,

    // Actions
    onCancel     : userDefinedCancelHandler,
    onCompleted  : userDefinedCompletedHandler,
    onSubmit     : userDefinedSubmitHandler,
    onSubmitError: userDefinedSubmitErrorHandler,

    // Modal Props
    defaultOpen : userDefinedModalDefaultOpen,
    onModalClose: userDefinedModalCloseHandler,
    onModalOpen : userDefinedModalOpenHandler,
    open        : userDefinedModalOpen
  } = userDefinedProps;


  // ----
  // Define Actions
  // ----
  const onCancel = userDefinedCancelHandler || defaultDefinedCancelHandler;
  const onCompleted = userDefinedCompletedHandler || defaultDefinedCompletedHandler;
  const onSubmit = userDefinedSubmitHandler || defaultDefinedSubmitHandler;
  const onSubmitError = userDefinedSubmitErrorHandler || defaultDefinedSubmitErrorHandler;


  // ----
  // Hooks and State Definition
  // ----
  const { notificationManager } = useSmartComponents() || {};
  const client = useClient();

  const [ actionError, setActionError ] = React.useState<ClientRequestError>();
  const [ open, trySetModalOpen ] = useAutoControlledValue(false, {
    defaultProp: userDefinedModalDefaultOpen,
    prop       : userDefinedModalOpen
  });

  const actionHelpers: BaseActionHelpers = React.useMemo(
    () => ({
      client,
      error   : actionError,
      setError: setActionError,
      toast   : notificationManager
    }),
    [ actionError, client, notificationManager ]
  );


  // ----
  // Utilities
  // ----
  const couldRenderActionButton = React.useCallback(
    (userDefinedButton?: ShorthandItem<ButtonProps>, defaultDefinedButton?: ShorthandItem<ButtonProps>): boolean => {
      /** If user defined button is explicit set to null, hide button */
      if (userDefinedButton === null) {
        return false;
      }

      /** If no button exists, omit rendering */
      if (!defaultDefinedButton && !userDefinedButton) {
        return false;
      }

      /** Fallback to true */
      return true;
    },
    []
  );


  // ----
  // Handlers
  // ----
  const handleModalOpen = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, modalProps: ModalProps) => {
      /** Try to set the auto controlled open state value */
      trySetModalOpen(true);
      /** Check if a user defined handler exists */
      if (typeof userDefinedModalOpenHandler === 'function') {
        userDefinedModalOpenHandler(e, modalProps);
      }
    },
    [ trySetModalOpen, userDefinedModalOpenHandler ]
  );

  const handleModalClose = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, modalProps: ModalProps) => {
      /** Try to set the auto controlled open state value */
      trySetModalOpen(false);
      /** Check if a user defined handler exists */
      if (typeof userDefinedModalCloseHandler === 'function') {
        userDefinedModalCloseHandler(e, modalProps);
      }
    },
    [ trySetModalOpen, userDefinedModalCloseHandler ]
  );


  // ----
  // Return Data
  // ----
  return {
    // Action Helpers
    actionHelpers,

    // State
    actionError,
    open,

    // Utilities
    couldRenderActionButton,

    // Handlers
    handleModalOpen,
    handleModalClose,

    // Modals
    trigger: userDefinedModalTrigger ?? defaultDefinedModalTrigger,

    // Actions
    ...({
      onCancel,
      onCompleted,
      onSubmit,
      onSubmitError
    } as Actions)
  };

}
