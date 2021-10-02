import type { ClientRequestError } from '@appbuckets/react-app-client';

export interface QuerySuspenseErrorProps extends ClientRequestError {
  /** A generic error */
  Error?: Error;
}
