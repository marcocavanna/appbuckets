import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Checkbox from '@appbuckets/react-ui/src/Checkbox';
import type { CheckboxProps } from '@appbuckets/react-ui/src/Checkbox';


export default {
  title    : 'Input/Checkbox',
  component: Checkbox
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<CheckboxProps> = (props) => (<Checkbox {...props} />);


export const Overview = Template.bind({});
