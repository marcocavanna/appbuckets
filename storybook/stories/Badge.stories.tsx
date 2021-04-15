import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Badge from '@appbuckets/react-ui/src/Badge';
import type { BadgeProps } from '@appbuckets/react-ui/src/Badge';


export default {
  title    : 'Display/Badge',
  component: Badge
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<BadgeProps> = (props) => (<Badge {...props} />);


export const Overview = Template.bind({});
