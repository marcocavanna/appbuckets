import * as React from 'react';

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
      /** Check if is AspNet Core validation error object */
      if (/validation errors/.test(maybeClientError.error) && maybeClientError.statusCode === 400) {
        /** Build the message list */
        const messageList: string[] = [];

        if (isObject(maybeClientError.response?.errors)) {
          Object.keys(maybeClientError.response!.errors).forEach((key) => {
            const errors = maybeClientError.response!.errors[key] as string[];
            messageList.push(...errors);
          });
        }

        return {
          header : 'Errori nei dati inviati',
          content: !!messageList.length && (
            <div className={'mt-2'}>
              <ul>
                {messageList.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )
        };
      }

      /** Return Json Problem Details */
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
