import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Select from '@appbuckets/react-ui/Select';
import type { SelectProps } from '@appbuckets/react-ui/Select';


export default {
  title    : 'Input/Select',
  component: Select
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<SelectProps> = (props) => (<Select {...props} />);


export const Overview = Template.bind({});
