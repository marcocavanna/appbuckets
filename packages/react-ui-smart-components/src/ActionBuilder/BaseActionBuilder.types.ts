import * as React from 'react';

import type { ShorthandItem } from '@appbuckets/react-ui-core';

import type { ButtonProps } from '@appbuckets/react-ui/Button';
import type { ModalProps } from '@appbuckets/react-ui/Modal';

import type { Client, ClientRequestError } from '@appbuckets/react-app-client';

import type {
  // eslint-disable-next-line import/no-named-default
  default as NotificationManager,
  NotificationContent
} from '../NotificationManager';


/* --------
 * Internal Types
 * -------- */
export type MaybePromise<T> = T | Promise<T>;


/* --------
 * Functional Types
 * -------- */
export interface BaseActionHelpers {
  /** The current Client instance */
  client: Client<any, any>;

  /** Current Action Error */
  error: ClientRequestError | undefined;

  /** A function to show/hide errors */
  setError: React.Dispatch<React.SetStateAction<ClientRequestError | undefined>>;

  /** The chosen notification manager instance */
  toast: NotificationManager | undefined;
}


/* --------
 * Action Types
 * -------- */

/**
 * The action to fire when user
 * will click on primary submit button
 */
export type BaseActionSubmitHandler<Result, Dto, HasData extends boolean, Helpers extends BaseActionHelpers, Props> =
  HasData extends true
    ? ((data: Dto, helpers: Helpers, props: Props) => MaybePromise<Result>)
    : ((helpers: Helpers, props: Props) => MaybePromise<Result>);

/**
 * The action to fire when user
 * will click on secondary cancel button
 */
export type BaseActionCancelHandler<Helpers extends BaseActionHelpers, Props> =
  (helpers: Helpers, props: Props) => MaybePromise<void>;

/**
 * The action to fire when tha main
 * submit action has been completed
 */
export type BaseActionCompletedHandler<Result, Dto, HasData extends boolean, Helpers extends BaseActionHelpers, Props> =
  HasData extends true
    ? ((result: Result, data: Dto, helpers: Helpers, props: Props) => MaybePromise<void>)
    : ((result: Result, helpers: Helpers, props: Props) => MaybePromise<void>);

/**
 * The action to fire if the main
 * submit action will produce an error
 */
export type BaseActionSubmitErrorHandler<Dto, HasData extends boolean, Helpers extends BaseActionHelpers, Props> =
  HasData extends true
    ? ((error: any, data: Dto, helpers: Helpers, props: Props) => MaybePromise<void>)
    : ((error: any, helpers: Helpers, props: Props) => MaybePromise<void>);


export interface BaseActionBuilderActions<OnCancel = any, OnCompleted = any, OnSubmit = any, OnSubmitError = any> {
  /** Handler to Execute on Cancel Button Click */
  onCancel?: OnCancel;

  /** Handler to Execute on Action Completed */
  onCompleted?: OnCompleted;

  /** Handler to Execute on Submit Button Click */
  onSubmit?: OnSubmit;

  /** Handler to Execute on Submit Handler Error */
  onSubmitError?: OnSubmitError;
}


/* --------
 * Notifications
 * -------- */
export interface BaseActionBuilderNotifications {
  /** On Canceled Message */
  onCanceled?: NotificationContent;

  /** On Error Message */
  onError?: 'thrown' | NotificationContent;

  /** On Success Message */
  onSubmitted?: NotificationContent;
}


/* --------
 * Shared Interfaces
 * -------- */
interface BaseActionBuilderSharedProps {
  /** The cancel button to show */
  cancelButton?: ShorthandItem<ButtonProps>;

  /** The submit button to show */
  submitButton?: ShorthandItem<ButtonProps>;

  /** Trigger for modal */
  trigger?: ModalProps['trigger'];
}


/* --------
 * Configuration Types
 * -------- */
interface BaseActionBuilderStrictConfig<Content extends React.ComponentType, Notifications> {
  /** The main content to show */
  Content?: Content;

  /** The component display name */
  displayName: string;

  /** Default toast message to show on action */
  toast?: Notifications;
}

export type BaseActionBuilderConfig<Content extends React.ComponentType<any>,
  Actions extends BaseActionBuilderActions,
  Notifications> =
  & BaseActionBuilderSharedProps
  & Actions
  & BaseActionBuilderStrictConfig<Content, Notifications>;


/* --------
 * Props Types
 * -------- */
interface BaseActionBuilderStrictProps {
  /** Set the default open modal state */
  defaultOpen?: boolean;

  /** Render the form as modal */
  modal?: boolean;

  /** Set modal props */
  modalProps?: Partial<Omit<ModalProps, 'defaultOpen' | 'onClose' | 'onOpen' | 'open' | 'trigger'>>;

  /** On Modal Close Handler */
  onModalClose?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void;

  /** On Modal Open Handler */
  onModalOpen?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void;

  /** Manually control open modal state */
  open?: boolean;
}

export type BaseActionBuilderProps<Props extends {}, Actions extends BaseActionBuilderActions> =
  & Props
  & BaseActionBuilderSharedProps
  & Actions
  & BaseActionBuilderStrictProps;
