import * as React from 'react';

import { addons } from '@storybook/addons';
import type { DecoratorFn } from '@storybook/react';

import { Client, ClientProvider } from '@appbuckets/react-app-client';

import '@appbuckets/react-ui/styles/index.scss';
import './stories.scss';

import theme from './theme';


addons.setConfig({
  theme
});


/* --------
 * Apply Default Parameters
 * -------- */
export const parameters = {
  actions : { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  options : {
    storySort: (a: any, b: any) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
};


/* --------
 * Apply Default Decorators
 * -------- */
const mockedClient = Client.getInstance<any, {}>({
  api: { getUserData: { url: '/api/me' } }
});

export const decorators: DecoratorFn[] = [
  (Story) => (
    <ClientProvider value={mockedClient}>
      {Story()}
    </ClientProvider>
  )
];
