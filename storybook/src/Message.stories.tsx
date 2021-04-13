import * as React from 'react';

import { Message } from '.';


export default { title: 'Collections/Message', component: Message };

export const baseMessage = () => {

  const doNothing = () => null;

  return (
    <Message
      danger
      onDismiss={doNothing}
      icon={{
        name     : 'raspberry-pi',
        iconStyle: 'fab'
      }}
      header={'Error'}
      content={'Si è verificato un errore durante il bla bla bla'}
    />
  );
};
