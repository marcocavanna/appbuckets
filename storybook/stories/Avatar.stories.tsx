import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { Avatar, AvatarProps } from '@appbuckets/react-ui';


export default {
  title    : 'Display/Avatar',
  component: Avatar
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<AvatarProps> = (props) => (<Avatar {...props} />);


export const Overview = Template.bind({});
Overview.args = { content: 'A' };
