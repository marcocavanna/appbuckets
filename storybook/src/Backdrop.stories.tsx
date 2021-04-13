import * as React from 'react';

import { Backdrop } from './index';


export default { title: 'Modules/Backdrop', component: Backdrop };

export const pageBackdrop = () => (
  <Backdrop
    page
    visible
    content={'Hello World!'}
  />
);

export const loaderFullPage = () => (
  <Backdrop
    page
    visible
    loading
    loaderProps={{ type: 'indeterminate bar' }}
    content={'Hello World!'}
  />
);
