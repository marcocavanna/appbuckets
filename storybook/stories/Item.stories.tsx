import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Item from '@appbuckets/react-ui/src/Item';
import type { ItemProps } from '@appbuckets/react-ui/src/Item';


export default {
  title    : 'Display/Item',
  component: Item
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<ItemProps> = (props) => (<Item {...props} />);


export const Overview = Template.bind({});
