import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Toast from '@appbuckets/react-ui/Toast';
import type { ToastProps } from '@appbuckets/react-ui/Toast';


export default {
  title    : 'Display/Toast',
  component: Toast
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<ToastProps> = (props) => (<Toast {...props} />);


export const Overview = Template.bind({});
