import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Button from '@appbuckets/react-ui/Button';
import type { ButtonProps } from '@appbuckets/react-ui/Button';


export default {
  title    : 'Input/Button',
  component: Button
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<ButtonProps> = (props) => (<Button {...props} />);


export const Overview = Template.bind({});
Overview.args = { content: 'Click Me!' };
