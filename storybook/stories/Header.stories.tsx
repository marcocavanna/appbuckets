import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Header from '@appbuckets/react-ui/src/Header';
import type { HeaderProps } from '@appbuckets/react-ui/src/Header';


export default {
  title    : 'Display/Header',
  component: Header
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<HeaderProps> = (props) => (<Header {...props} />);


export const Overview = Template.bind({});
