import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Divider from '@appbuckets/react-ui/src/Divider';
import type { DividerProps } from '@appbuckets/react-ui/src/Divider';


export default {
  title    : 'Display/Divider',
  component: Divider
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<DividerProps> = (props) => (<Divider {...props} />);


export const Overview = Template.bind({});
