import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import EmptyContent from '@appbuckets/react-ui/EmptyContent';
import type { EmptyContentProps } from '@appbuckets/react-ui/EmptyContent';


export default {
  title    : 'Display/EmptyContent',
  component: EmptyContent
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<EmptyContentProps> = (props) => (<EmptyContent {...props} />);


export const Overview = Template.bind({});
