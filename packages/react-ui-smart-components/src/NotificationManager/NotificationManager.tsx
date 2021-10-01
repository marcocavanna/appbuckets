import * as React from 'react';

import { ValidationError } from 'yup';

import ButterToast from 'butter-toast';
import type { RaiseParam } from 'butter-toast';

import type { ToastProps } from '@appbuckets/react-ui/Toast';

import { getToastProps } from './lib/getToastProps';

import type { NotificationContent, INotificationManager } from './NotificationManager.types';


export default class NotificationManager implements INotificationManager {

  /* --------
   * Constructor Function
   * -------- */
  constructor(
    private readonly namespace: string,
    private readonly Component: React.ComponentType<ToastProps>,
    private readonly defaultProps?: Partial<ToastProps>
  ) {
  }


  /* --------
   * Main Show Function
   * -------- */
  private show(content?: NotificationContent, options?: RaiseParam, overrideProps?: Partial<ToastProps>) {
    /** Cycle through the array */
    if (Array.isArray(content)) {
      content.forEach((singleContent) => (
        this.show(singleContent, options, overrideProps)
      ));
      return;
    }

    /** Cycle through YupValidation errors */
    if (content instanceof ValidationError) {
      content.errors.forEach((error) => (
        this.show(error, options, overrideProps)
      ));
      return;
    }

    /** Normalize Content to ToastProps */
    const contentProps = getToastProps(content);

    /** If content is invalid, return */
    if (!contentProps) {
      return;
    }

    /** Build toast props, combining default, computed and overridden */
    const toastProps: ToastProps = {
      ...this.defaultProps,
      ...contentProps,
      ...overrideProps
    };

    /** Get the component and raise the notification */
    const { Component } = this;

    ButterToast.raise({
      namespace: this.namespace,
      timeout: 6000,
      ...options,
      content: (props) => {

        const { dismiss, onClick } = props;

        const handleDismiss = typeof dismiss === 'function' && toastProps.dismissible
          ? () => dismiss()
          : undefined;

        const handleClick = typeof onClick === 'function' || typeof toastProps.onClick === 'function'
          ? (e: React.MouseEvent<HTMLElement>, componentProps: ToastProps) => {
            if (typeof onClick === 'function') {
              onClick(e);
            }

            if (typeof toastProps.onClick === 'function') {
              toastProps.onClick(e, componentProps);
            }
          }
          : undefined;

        return (
          <Component
            {...toastProps}
            dismiss={handleDismiss}
            onClick={handleClick}
          />
        );
      }
    });
  }


  public custom(content: NotificationContent, options?: RaiseParam, props?: Partial<ToastProps>) {
    return this.show(content, options, props);
  }

  default(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options);
  }

  error(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options, { danger: true, icon: 'times-circle' });
  }

  info(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options, { info: true, icon: 'info-circle' });
  }

  primary(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options, { primary: true });
  }

  secondary(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options, { secondary: true });
  }

  success(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options, { success: true, icon: 'check-circle' });
  }

  warning(props: NotificationContent, options?: RaiseParam): void {
    return this.show(props, options, { warning: true, icon: 'exclamation-circle' });
  }

}
