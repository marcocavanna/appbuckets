import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import LinearProgress from '@appbuckets/react-ui/src/LinearProgress';
import type { LinearProgressProps } from '@appbuckets/react-ui/src/LinearProgress';


export default {
  title    : 'Display/LinearProgress',
  component: LinearProgress
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<LinearProgressProps> = (props) => (<LinearProgress {...props} />);


export const Overview = Template.bind({});
