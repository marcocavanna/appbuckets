import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import NumericInput from '@appbuckets/react-ui/NumericInput';
import type { NumericInputProps } from '@appbuckets/react-ui/NumericInput';


export default {
  title    : 'Input/NumericInput',
  component: NumericInput
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<NumericInputProps> = (props) => (<NumericInput {...props} />);


export const Overview = Template.bind({});
