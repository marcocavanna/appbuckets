import * as React from 'react';

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
type PlainOrBuilder<TOut, Props extends {}, Result> = TOut | ((props: ConfirmComponentProps<Props, Result>) => TOut);

export interface ConfirmActionHelpers extends BaseActionHelpers {
}


/* --------
 * Action Types
 * -------- */
export type ConfirmActionCancelHandler<Props extends {}> =
  BaseActionCancelHandler<ConfirmActionHelpers, ConfirmComponentProps<Props, any>>;

export type ConfirmActionCompletedHandler<Props extends {}, Result> =
  BaseActionCompletedHandler<Result, void, false, ConfirmActionHelpers, ConfirmComponentProps<Props, Result>>;

export type ConfirmActionSubmitHandler<Props extends {}, Result> =
  BaseActionSubmitHandler<Result, void, false, ConfirmActionHelpers, ConfirmComponentProps<Props, Result>>;

export type ConfirmActionSubmitErrorHandler<Props extends {}> =
  BaseActionSubmitErrorHandler<void, false, ConfirmActionHelpers, ConfirmComponentProps<Props, any>>;

// eslint-disable-next-line max-len
export type ConfirmActions<Props extends {}, Result> = BaseActionBuilderActions<ConfirmActionCancelHandler<Props>, ConfirmActionCompletedHandler<Props, Result>, ConfirmActionSubmitHandler<Props, Result>, ConfirmActionSubmitErrorHandler<Props>>;


/* --------
 * Notifications
 * -------- */
export interface ConfirmBuilderNotifications extends BaseActionBuilderNotifications {
}


/* --------
 * Component Definition
 * -------- */
export type ConfirmComponentProps<Props extends {}, Result> =
  BaseActionBuilderProps<Props, ConfirmActions<Props, Result>>;

export type ConfirmComponent<Props extends {}, Result> = React.FunctionComponent<ConfirmComponentProps<Props, Result>>;

export type ExtensibleConfirmComponent<Props extends {}, Result> =
  & ConfirmComponent<Props, Result>
  // eslint-disable-next-line max-len
  & { extend: <NewProps extends {}, NewResult = any>(config: ConfirmBuilderConfig<NewProps, NewResult>) => ExtensibleConfirmComponent<NewProps, NewResult> };


/* --------
 * Configuration Types
 * -------- */
export interface ConfirmBuilderConfig<Props extends {}, Result>
  extends BaseActionBuilderConfig<ConfirmComponent<Props, Result>, ConfirmActions<Props, Result>, ConfirmBuilderNotifications> {
  /** The confirm modal default props to use */
  defaultProps?: PlainOrBuilder<Partial<ConfirmComponentProps<Props, Result>>, Props, Result>;

  /** The confirm modal override props object */
  overrideProps?: PlainOrBuilder<Partial<ConfirmComponentProps<Props, Result>>, Props, Result>;
}
