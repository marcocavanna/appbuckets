import * as React from 'react';

import QuerySuspendedComponent from '../QuerySuspendedComponent';

import type {
  QueryResultBase,
  QuerySuspendedComponentProps,
  SuccessesQueryComponent
} from '../QuerySuspendedComponent.types';


/* --------
 * Internal Types
 * -------- */
type PlainOrBuilder<Props extends {}, Result> = Result | ((props: Props) => Result);

type AsFunctionReturn<Result> = (...args: any[]) => Result;

type OmittedProps = 'Component' | 'innerProps' | 'query';


/* --------
 * HOC Definition
 * -------- */
export default function asSuspendedComponent<Props extends {},
  QueryResult extends QueryResultBase,
  QuerySuccessState = QueryResult>(
  Component: SuccessesQueryComponent<QuerySuccessState, Props>,
  useQuery: AsFunctionReturn<QueryResult>,
  queryArgs: PlainOrBuilder<Omit<Props, 'state'>, Parameters<AsFunctionReturn<QueryResult>>>,
  config?: Omit<QuerySuspendedComponentProps<QueryResult, QuerySuccessState, Props>, OmittedProps>
): React.VoidFunctionComponent<Omit<Props, 'state'>> {

  return function SuspendedWithHOC(props) {

    // ----
    // Get Query Args
    // ----
    const useQueryArgs = typeof queryArgs === 'function' ? queryArgs(props) : queryArgs;


    // ----
    // Execute Query
    // ----
    const useQueryResult = useQuery(...useQueryArgs);


    // ----
    // Component Render
    // ----
    return (
      React.createElement(
        QuerySuspendedComponent,
        {
          ...config,
          Component,
          query: useQueryResult,
          innerProps: props
        }
      )
    );

  };

}
