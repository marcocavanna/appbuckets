import type { RaiseParam } from 'butter-toast';
import type { ValidationError } from 'yup';
import type { ToastProps } from '@appbuckets/react-ui/Toast';
import type { ClientRequestError } from '@appbuckets/react-app-client';


type StrictNotificationContent = string | ToastProps | ClientRequestError;

export type NotificationContent = StrictNotificationContent | StrictNotificationContent[] | ValidationError;

export type NotificationRaiser = (content: NotificationContent, options?: RaiseParam) => void;

export interface INotificationManager {
  /** Show a custom style notification */
  custom(content: NotificationContent, options?: RaiseParam, props?: Partial<ToastProps>): void;

  /** Show a default style notification */
  default: NotificationRaiser;

  /** Show an error notification */
  error: NotificationRaiser;

  /** Show an info notification */
  info: NotificationRaiser;

  /** Show a primary notification */
  primary: NotificationRaiser;

  /** Show a secondary notification */
  secondary: NotificationRaiser;

  /** Show a success notification */
  success: NotificationRaiser;

  /** Show a warning notification */
  warning: NotificationRaiser;
}
