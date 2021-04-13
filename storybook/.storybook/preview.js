import React from 'react';

import '../src/styles/index.scss';
import './stories.scss';

import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { BucketTheme } from '../src/react/context/BucketContext';


addDecorator(withKnobs());

addDecorator((Story) => (
  <BucketTheme theme={{}}>
    <Story />
  </BucketTheme>
));
