import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Slider from '@appbuckets/react-ui/Slider';
import type { SliderProps } from '@appbuckets/react-ui/Slider';


export default {
  title    : '__Replace/Slider',
  component: Slider
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<SliderProps> = (props) => (
  <Slider
    tooltip
    danger
    label={'Choose a Value'}
    hint={'Slide to Select'}
    actions={[
      {
        key    : 1,
        content: 'Send',
        icon   : 'paper-plane',
        primary: true
      }
    ]}
    icon={{
      name: 'temperature-high'
    }}
    marks={{ 0: '0', 10: 10, 50: 50 }}
    {...props}
  />
);


export const Overview = Template.bind({});
