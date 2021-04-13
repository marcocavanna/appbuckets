import * as React from 'react';

import { Loader } from '.';


export default { title: 'Elements/Loader', component: Loader };


export const defaultLoader = () => (
  <Loader centered primary content={'Caricamento'} type={'indeterminate bar'} />
);
