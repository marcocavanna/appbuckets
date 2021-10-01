import type { RaiseParam } from 'butter-toast';
import type { ValidationError } from 'yup';
import type { ToastProps } from '@appbuckets/react-ui/Toast';
import type { ClientRequestError } from '@appbuckets/react-app-client';


type StrictNotificationContent = string | ToastProps | ClientRequestError;

export type NotificationContent = StrictNotificationContent | StrictNotificationContent[] | ValidationError;

export interface INotificationManager {
  /** Show a custom style notification */
  custom(content: NotificationContent, options?: RaiseParam, props?: Partial<ToastProps>): void;

  /** Show a default style notification */
  default(content: NotificationContent, options?: RaiseParam): void;

  /** Show an error notification */
  error(content: NotificationContent, options?: RaiseParam): void;

  /** Show an info notification */
  info(content: NotificationContent, options?: RaiseParam): void;

  /** Show a primary notification */
  primary(content: NotificationContent, options?: RaiseParam): void;

  /** Show a secondary notification */
  secondary(content: NotificationContent, options?: RaiseParam): void;

  /** Show a success notification */
  success(content: NotificationContent, options?: RaiseParam): void;

  /** Show a warning notification */
  warning(content: NotificationContent, options?: RaiseParam): void;
}
