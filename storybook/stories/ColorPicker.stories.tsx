import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import ColorPicker from '@appbuckets/react-ui/src/ColorPicker';
import type { ColorPickerProps } from '@appbuckets/react-ui/src/ColorPicker';


export default {
  title    : 'Input/ColorPicker',
  component: ColorPicker
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<ColorPickerProps> = (props) => (<ColorPicker {...props} />);


export const Overview = Template.bind({});
