import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import MultiSelect from '@appbuckets/react-ui/MultiSelect';
import type { MultiSelectProps } from '@appbuckets/react-ui/MultiSelect';


export default {
  title    : 'Input/MultiSelect',
  component: MultiSelect
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<MultiSelectProps> = (props) => (<MultiSelect {...props} />);


export const Overview = Template.bind({});
