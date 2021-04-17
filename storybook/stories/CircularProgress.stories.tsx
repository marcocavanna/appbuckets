import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import CircularProgress from '@appbuckets/react-ui/CircularProgress';
import type { CircularProgressProps } from '@appbuckets/react-ui/CircularProgress';


export default {
  title    : 'Display/CircularProgress',
  component: CircularProgress
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<CircularProgressProps> = (props) => (<CircularProgress {...props} />);


export const Overview = Template.bind({});
