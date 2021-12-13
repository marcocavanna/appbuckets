import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Avatar from '@appbuckets/react-ui/Avatar';
import type { AvatarProps } from '@appbuckets/react-ui/Avatar';


export default {
  title: 'Display/Avatar',
  component: Avatar
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<AvatarProps> = (props) => (<Avatar {...props} />);

export const Overview = Template.bind({});
Overview.args = { content: 'A' };

export const Image = Template.bind({});
Image.args = {
  image: 'https://localhost:5001/v1/uploads/profiles/95699ce6-55ed-4158-b181-8be828105083.png',
  type : 'square'
};
