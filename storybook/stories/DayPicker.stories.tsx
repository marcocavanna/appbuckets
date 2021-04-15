import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import DayPicker from '@appbuckets/react-ui/src/DayPicker';
import type { DayPickerProps } from '@appbuckets/react-ui/src/DayPicker';


export default {
  title    : 'Input/DayPicker',
  component: DayPicker
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<DayPickerProps> = (props) => (<DayPicker {...props} />);


export const Overview = Template.bind({});
