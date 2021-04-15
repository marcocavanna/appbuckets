import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import DropdownMenu from '@appbuckets/react-ui/src/DropdownMenu';
import type { DropdownMenuProps } from '@appbuckets/react-ui/src/DropdownMenu';


export default {
  title    : 'Display/DropdownMenu',
  component: DropdownMenu
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<DropdownMenuProps> = (props) => (<DropdownMenu {...props} />);


export const Overview = Template.bind({});
