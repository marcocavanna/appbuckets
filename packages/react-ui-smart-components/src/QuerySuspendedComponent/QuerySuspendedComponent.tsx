import * as React from 'react';

import Loader from '@appbuckets/react-ui/Loader';

import type { ClientRequestError } from '@appbuckets/react-app-client';

import QuerySuspenseError from '../QuerySuspenseError';

import type { QuerySuspendedComponentProps } from './QuerySuspendedComponent.types';


const QuerySuspendedComponent: React.VoidFunctionComponent<QuerySuspendedComponentProps<any, any, any>> = (props) => {

  const {
    Component,
    innerProps,
    loaderProps,
    query
  } = props;


  // ----
  // Loading State
  // ----
  if (query.status === 'loading' || query.isLoading) {
    return (
      <Loader
        centered
        className={'mt-6 mb-6'}
        appearance={'primary'}
        type={'indeterminate bar'}
        size={'big'}
        {...loaderProps}
      />
    );
  }


  // ----
  // Error Status
  // ----
  if (query.status === 'error' || query.isError) {
    return (
      <QuerySuspenseError {...query.error as ClientRequestError} />
    );
  }


  // ----
  // Main Component Render
  // ----
  if ((query.status === 'success' || query.isSuccess) && Component) {
    return (
      <Component
        {...innerProps}
        state={query}
      />
    );
  }


  // ----
  // Any other result will fallback to null
  // ----
  return null;

};

QuerySuspendedComponent.displayName = 'QuerySuspendedComponent';

export default QuerySuspendedComponent;
