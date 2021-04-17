import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Menu from '@appbuckets/react-ui/Menu';
import type { MenuProps } from '@appbuckets/react-ui/Menu';


export default {
  title    : 'Display/Menu',
  component: Menu
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<MenuProps> = (props) => (<Menu {...props} />);


export const Overview = Template.bind({});
