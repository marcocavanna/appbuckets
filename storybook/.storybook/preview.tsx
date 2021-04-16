import { addons } from '@storybook/addons';

import '@appbuckets/react-ui/styles/index.scss';
import './stories.scss';

import theme from './theme';


addons.setConfig({
  theme
});

export const parameters = {
  actions : { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  options : {
    storySort: (a: any, b: any) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
};
