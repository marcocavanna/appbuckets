import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Icon from '@appbuckets/react-ui/src/Icon';
import type { IconProps } from '@appbuckets/react-ui/src/Icon';


export default {
  title    : 'Display/Icon',
  component: Icon
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<IconProps> = (props) => (<Icon {...props} />);


export const Overview = Template.bind({});
