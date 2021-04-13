import * as React from 'react';


export const Text: React.FunctionComponent = (props) => (
  <div className={'document-text'}>
    <p className={'document-text-content'}>
      {props.children}
    </p>
  </div>
);
