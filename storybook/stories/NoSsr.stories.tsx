import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import NoSsr from '@appbuckets/react-ui/NoSsr';
import type { NoSsrProps } from '@appbuckets/react-ui/NoSsr';


export default {
  title    : '__Replace/NoSsr',
  component: NoSsr
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<NoSsrProps> = (props) => (<NoSsr {...props} />);


export const Overview = Template.bind({});
