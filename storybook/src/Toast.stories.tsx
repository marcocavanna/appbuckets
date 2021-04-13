import * as React from 'react';

import { Toast } from '.';


export default { title: 'Elements/Toast', component: Toast };

export const baseToast = () => {

  const doNothing = () => null;

  return (
    <Toast
      success
      dismissible
      onClick={doNothing}
      icon={'thumbs-up'}
      header={'Nuova Notifica'}
      content={'Elemento Salvato'}
    />
  );
};
