import * as React from 'react';

import type {
  // eslint-disable-next-line import/no-named-default
  default as NotificationManager,
  NotificationContent,
  NotificationRaiser
} from '../../NotificationManager';

import type { BaseActionBuilderNotifications } from '../BaseActionBuilder.types';


/* --------
 * Types
 * -------- */
export interface UseActionNotificationResult {
  /** Use default settings to raise onCanceled Notification */
  raiseOnCanceled: () => void;

  /** Use default settings to raise onError Notification */
  raiseOnError: (thrownError?: any) => void;

  /** Use default settings to raise onSubmitted Notification */
  raiseOnSubmitted: () => void;
}


/* --------
 * Hook Definition
 * -------- */
export default function useActionNotification(
  manager: NotificationManager | undefined,
  notifications: BaseActionBuilderNotifications
): UseActionNotificationResult {

  const {
    onCanceled,
    onError,
    onSubmitted
  } = notifications;


  // ----
  // Build Base Raise Notification Function
  // ----
  const raiseNotification = React.useCallback(
    (raiser?: NotificationRaiser, content?: NotificationContent) => {
      /** Assert raiser exists */
      if (typeof raiser !== 'function') {
        return;
      }

      /** Assert content exists */
      if (!content) {
        return;
      }

      /** Raise Notification */
      raiser(content);
    },
    []
  );


  // ----
  // Build single raiser
  // ----
  const { info, error, success } = manager || {};

  const raiseOnCanceled = React.useCallback(
    () => raiseNotification(info, onCanceled),
    [ info, onCanceled, raiseNotification ]
  );

  const raiseOnError = React.useCallback(
    (thrownError?: any) => {
      if (onError === 'thrown') {
        raiseNotification(error, thrownError);
      }
      else {
        raiseNotification(error, onError);
      }
    },
    [ error, onError, raiseNotification ]
  );

  const raiseOnSubmitted = React.useCallback(
    () => raiseNotification(success, onSubmitted),
    [ onSubmitted, raiseNotification, success ]
  );


  // ----
  // Return Utilities
  // ----
  return {
    raiseOnCanceled,
    raiseOnError,
    raiseOnSubmitted
  };

}
