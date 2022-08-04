import * as React from 'react';

import NextDocument, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends NextDocument {
  // ----
  // Page Render
  // ----
  public render(): JSX.Element {
    return (
      <Html lang={'en'}>
        <Head>
          {/* Append the Manifest */}
          <link rel={'manifest'} href={'/static/manifest.json'} />

          {/* Set PWA ThemeColor */}
          <meta name={'theme-color'} content={'#516CC2'} />

          {/* Charset */}
          <meta charSet={'utf-8'} />

          {/* Base Icon */}
          <link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/static/android-icon-192x192.png'} />
          <link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/static/favicon-32x32.png'} />
          <link rel={'icon'} type={'image/png'} sizes={'96x96'} href={'/static/favicon-96x96.png'} />
          <link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/static/favicon-16x16.png'} />
          <link rel={'icon'} href={'/static/favicon.ico'} />

          {/* MS Icon */}
          <meta name={'msapplication-TileColor'} content={'#516CC2'} />
          <meta name={'msapplication-TileImage'} content={'/static/ms-icon-144x144.png'} />

          {/* iOS Icon */}
          <link rel={'apple-touch-icon'} sizes={'57x57'} href={'/static/apple-icon-57x57.png'} />
          <link rel={'apple-touch-icon'} sizes={'60x60'} href={'/static/apple-icon-60x60.png'} />
          <link rel={'apple-touch-icon'} sizes={'72x72'} href={'/static/apple-icon-72x72.png'} />
          <link rel={'apple-touch-icon'} sizes={'76x76'} href={'/static/apple-icon-76x76.png'} />
          <link rel={'apple-touch-icon'} sizes={'114x114'} href={'/static/apple-icon-114x114.png'} />
          <link rel={'apple-touch-icon'} sizes={'120x120'} href={'/static/apple-icon-120x120.png'} />
          <link rel={'apple-touch-icon'} sizes={'144x144'} href={'/static/apple-icon-144x144.png'} />
          <link rel={'apple-touch-icon'} sizes={'152x152'} href={'/static/apple-icon-152x152.png'} />
          <link rel={'apple-touch-icon'} sizes={'180x180'} href={'/static/apple-icon-180x180.png'} />
        </Head>
        <body><Main /><NextScript /></body>
      </Html>
    );
  }
}
