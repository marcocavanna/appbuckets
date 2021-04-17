import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Message from '@appbuckets/react-ui/Message';
import type { MessageProps } from '@appbuckets/react-ui/Message';


export default {
  title    : 'Display/Message',
  component: Message
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<MessageProps> = (props) => (<Message {...props} />);


export const Overview = Template.bind({});
