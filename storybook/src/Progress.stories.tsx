import * as React from 'react';

import {
  number,
  boolean
} from '@storybook/addon-knobs';

import { CircularProgress, LinearProgress } from './index';


export default { title: 'Elements/Progress' };

export const linearProgress = () => (
  <LinearProgress
    min={number('Minimum', 0)}
    max={number('Maximum', 100)}
    value={number('Progress', 75)}
    indicator={boolean('Indicator', true)}
    limits={boolean('Limits', true)}
    inverted={boolean('Inverted', false)}
    reverse={boolean('Reverse', true)}
  />
);

export const circularProgress = () => (
  <React.Fragment>
    <CircularProgress value={140} indicator={'percent'} size={'extra small'} />
    <CircularProgress value={140} indicator={'percent'} size={'small'} />
    <CircularProgress value={140} indicator={'percent'} />
    <CircularProgress value={140} indicator={'percent'} size={'large'} />
    <CircularProgress value={140} indicator={'percent'} size={'big'} />
    <CircularProgress value={140} indicator={'percent'} size={'huge'} />
  </React.Fragment>
);
