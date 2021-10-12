import type { ToastProps } from '@appbuckets/react-ui/Toast';
import type { ClientRequestError } from '@appbuckets/react-app-client';

import isObject from '../../utils/isObject';

import type { NotificationContent } from '../NotificationManager.types';


export function getToastProps(content?: NotificationContent): ToastProps | undefined {
  /** Assert is not null or undefined */
  if (content === null || content === undefined) {
    return undefined;
  }

  /** Transform plain text into simple toast props */
  if (typeof content === 'string') {
    return { header: content };
  }

  /** Check if is an object */
  if (isObject(content)) {
    /** Try to check if is a ClientRequestError */
    const maybeClientError = content as ClientRequestError;

    if (typeof maybeClientError?.statusCode === 'number' && typeof maybeClientError?.error === 'string') {
      return {
        header : maybeClientError.error,
        content: Array.isArray(maybeClientError.message)
          ? maybeClientError.message.join('\n')
          : maybeClientError.message
      };
    }
  }

  /** Fallback to undefined */
  return undefined;
}
