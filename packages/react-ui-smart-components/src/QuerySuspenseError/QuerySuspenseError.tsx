import * as React from 'react';

import Divider from '@appbuckets/react-ui/Divider';
import Header from '@appbuckets/react-ui/Header';
import Message from '@appbuckets/react-ui/Message';

import type { QuerySuspenseErrorProps } from './QuerySuspenseError.types';


const QuerySuspenseError: React.VoidFunctionComponent<QuerySuspenseErrorProps> = (props) => {

  // ----
  // Error deconstruct
  // ----
  const {
    error,
    method,
    message,
    response,
    statusCode,
    stack,
    url
  } = props;


  // ----
  // Internal Data
  // ----
  const viewErrorExtra = process.env.NODE_ENV === 'development';


  // ----
  // Memoized Data
  // ----
  const extraContent = React.useMemo(
    () => viewErrorExtra && (
      <React.Fragment>
        <Divider danger content={statusCode} textAlign={'left'} />

        {url && (
          <div className={'mt-4 has-text-left'}>
            <b style={{ display: 'block' }}>URL</b>
            <p>{method || 'GET'} @ {url}</p>
          </div>
        )}

        {response && (
          <div className={'mt-4 has-text-left'}>
            <b style={{ display: 'block' }}>RESPONSE</b>
            <pre
              className={'has-text-danger has-font-bold'}
              style={{
                padding        : 12,
                borderRadius   : 5,
                whiteSpace     : 'pre-wrap',
                backgroundColor: 'rgba(0,0,0,.05)'
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {stack && (
          <div className={'mt-4 has-text-left'}>
            <b style={{ display: 'block' }}>STACK</b>
            <p style={{ whiteSpace: 'pre-wrap' }}>{stack}</p>
          </div>
        )}
      </React.Fragment>
    ),
    [ method, response, stack, statusCode, url, viewErrorExtra ]
  );


  // ----
  // Rewrite error object if exists
  // ----
  if (props.Error instanceof Error) {
    return (
      <QuerySuspenseError
        statusCode={500}
        error={props.Error.name}
        message={props.Error.message}
        stack={props.Error.stack}
      />
    );
  }


  // ----
  // Component Render
  // ----
  return (
    <Message appearance={'danger'}>
      <Header
        content={error || 'Error'}
        subheader={message || 'server-error'}
      />
      {extraContent}
    </Message>
  );

};

QuerySuspenseError.displayName = 'QuerySuspenseError';

export default QuerySuspenseError;
