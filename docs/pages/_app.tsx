import * as React from 'react';

import { AppProps } from 'next/app';

import '../styles/theme/index.scss';


const MyApp: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps
}) => {
  return (
    <Component {...pageProps} />
  );
};

export default MyApp;
