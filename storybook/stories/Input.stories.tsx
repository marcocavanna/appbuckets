import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Input from '@appbuckets/react-ui/Input';
import type { InputProps } from '@appbuckets/react-ui/Input';


export default {
  title    : 'Input/Input',
  component: Input
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<InputProps> = (props) => (<Input {...props} />);


export const Overview = Template.bind({});
