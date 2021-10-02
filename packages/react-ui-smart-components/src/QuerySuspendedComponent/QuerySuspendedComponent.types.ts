import * as React from 'react';

import type { LoaderProps } from '@appbuckets/react-ui/Loader';

import type { ClientRequestError } from '@appbuckets/react-app-client';


export interface QueryResultBase {
  /** A client error object */
  error?: ClientRequestError | undefined | null;

  /** A boolean isError state */
  isError?: boolean;

  /** A boolean isLoading state */
  isLoading?: boolean;

  /** A boolean isSuccess state */
  isSuccess?: boolean;

  /** The query status */
  status?: string;
}

interface SuccessesQueryComponentProps<QuerySuccessState> {
  /** The success query state */
  state: QuerySuccessState;
}


export type SuccessesQueryComponent<QuerySuccessState, Props extends {} = {}> =
  React.FunctionComponent<SuccessesQueryComponentProps<QuerySuccessState> & Props>;


export interface QuerySuspendedComponentProps<QueryResult extends QueryResultBase,
  QuerySuccessState = QueryResult,
  Props extends {} = {}> {
  /** The component to render once the query state is success */
  Component?: SuccessesQueryComponent<QuerySuccessState, Props>;

  /** Inner props to pass to Component */
  innerProps?: Props;

  /** Override LoaderProps */
  loaderProps?: Partial<LoaderProps>;

  /** The query to execute */
  query: QueryResult;
}
