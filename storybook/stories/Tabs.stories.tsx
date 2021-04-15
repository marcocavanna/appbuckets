import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Tabs from '@appbuckets/react-ui/src/Tabs';
import type { TabsProps } from '@appbuckets/react-ui/src/Tabs';


export default {
  title    : 'Display/Tabs',
  component: Tabs
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<TabsProps> = (props) => (<Tabs {...props} />);


export const Overview = Template.bind({});
