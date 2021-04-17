import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Box from '@appbuckets/react-ui/Box';
import type { BoxProps } from '@appbuckets/react-ui/Box';


export default {
  title    : 'Layout/Box',
  component: Box
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<BoxProps> = (props) => (<Box {...props} />);


export const Overview = Template.bind({});
