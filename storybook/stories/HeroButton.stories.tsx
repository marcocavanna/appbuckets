import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import HeroButton from '@appbuckets/react-ui/HeroButton';
import type { HeroButtonProps } from '@appbuckets/react-ui/HeroButton';


export default {
  title    : 'Input/HeroButton',
  component: HeroButton
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<HeroButtonProps> = (props) => (<HeroButton {...props} />);


export const Overview = Template.bind({});
