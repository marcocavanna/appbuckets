import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Accordions from '@appbuckets/react-ui/Accordions';
import type { AccordionsProps } from '@appbuckets/react-ui/Accordions';


export default {
  title    : 'Display/Accordions',
  component: Accordions
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<AccordionsProps> = (props) => (<Accordions {...props} />);


export const Overview = Template.bind({});
