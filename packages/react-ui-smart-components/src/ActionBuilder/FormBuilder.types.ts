import * as React from 'react';

import type { AnyObject } from '@appbuckets/react-ui-core';
import type { UseFormReturn } from '@appbuckets/react-ui-forms';

import type { SchemaOf } from 'yup';

import type { NotificationContent } from '../NotificationManager';

import type {
  BaseActionCancelHandler,
  BaseActionCompletedHandler,
  BaseActionHelpers,
  BaseActionSubmitErrorHandler,
  BaseActionSubmitHandler,
  BaseActionBuilderActions,
  BaseActionBuilderConfig,
  BaseActionBuilderNotifications,
  BaseActionBuilderProps
} from './BaseActionBuilder.types';


/* --------
 * Utility Types
 * -------- */
type PlainOrBuilder<TOut, Dto extends AnyObject, Props extends {}, Result> =
  | TOut
  | ((props: ExtendedFormComponentProps<Dto, Props, Result>) => TOut);

export interface FormActionHelpers<Dto extends AnyObject> extends BaseActionHelpers {
  /** Current Form Context */
  form: UseFormReturn<Dto>;
}

export type FormBuilderSchema<Dto extends AnyObject, Props extends {}, Result> =
  PlainOrBuilder<SchemaOf<Dto>, Dto, Props, Result>;


/* --------
 * Actions
 * -------- */
export type FormActionCancelHandler<Dto extends AnyObject, Props extends {}> =
  BaseActionCancelHandler<FormActionHelpers<Dto>, ExtendedFormComponentProps<Dto, Props, any>>;

export type FormActionCompletedHandler<Dto extends AnyObject, Props extends {}, Result> =
  BaseActionCompletedHandler<Result, Dto, true, FormActionHelpers<Dto>, ExtendedFormComponentProps<Dto, Props, Result>>;

export type FormActionSubmitHandler<Dto extends AnyObject, Props extends {}, Result> =
  BaseActionSubmitHandler<Result, Dto, true, FormActionHelpers<Dto>, ExtendedFormComponentProps<Dto, Props, Result>>;

export type FormActionSubmitErrorHandler<Dto extends AnyObject, Props extends {}> =
  BaseActionSubmitErrorHandler<Dto, true, FormActionHelpers<Dto>, ExtendedFormComponentProps<Dto, Props, any>>;

// eslint-disable-next-line max-len
export type FormActions<Dto extends AnyObject, Props extends {}, Result> = BaseActionBuilderActions<FormActionCancelHandler<Dto, Props>, FormActionCompletedHandler<Dto, Props, Result>, FormActionSubmitHandler<Dto, Props, Result>, FormActionSubmitErrorHandler<Dto, Props>>;


/* --------
 * Notification
 * -------- */
export interface FormBuilderNotifications extends Pick<BaseActionBuilderNotifications, 'onCanceled' | 'onError'> {
  /** Notification to show on Creating data submit click */
  onCreatingSubmit?: NotificationContent;

  /** Notification to show on Editing data submit click */
  onEditingSubmit?: NotificationContent;
}


/* --------
 * Component Definition
 * -------- */
interface FormComponentStrictProps {
  /** Force default value to be any */
  defaultValues?: any;

  /** Force form as data editing */
  isEditing?: boolean;
}

export type FormComponentProps<Dto extends AnyObject, Props extends {}, Result> =
  & FormComponentStrictProps
  & BaseActionBuilderProps<Props, FormActions<Dto, Props, Result>>;

export type FormComponent<Dto extends AnyObject, Props extends {}, Result> =
  React.FunctionComponent<FormComponentProps<Dto, Props, Result>>;

type ExtendedFormComponentProps<Dto extends AnyObject, Props extends {}, Result> =
  & FormComponentProps<Dto, Props, Result>
  & { isEditing: boolean };


/* --------
 * Configuration Types
 * -------- */
export interface FormBuilderConfig<Dto extends AnyObject, Props extends {}, Result>
  extends BaseActionBuilderConfig<FormComponent<Dto, Props, Result>, FormActions<Dto, Props, Result>, FormBuilderNotifications> {
  /** The form default props to use */
  defaultProps?: PlainOrBuilder<Partial<FormComponentProps<Dto, Props, Result>>, Dto, Props, Result>;

  /** Extend form validation on submit */
  extendValidation?: boolean;

  /** Parse defaultValues before are set */
  parseData?: (data: any, props: ExtendedFormComponentProps<Dto, Props, Result>) => Dto;

  /** The schema to use to validate data */
  schema: FormBuilderSchema<Dto, Props, Result>;

  /** Strip unknown data from defaultValues */
  stripUnknown?: boolean;

  /** The form override props object */
  overrideProps?: PlainOrBuilder<Partial<FormComponentProps<Dto, Props, Result>>, Dto, Props, Result>;
}
