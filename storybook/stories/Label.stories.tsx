import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Label from '@appbuckets/react-ui/src/Label';
import type { LabelProps } from '@appbuckets/react-ui/src/Label';


export default {
  title    : 'Display/Label',
  component: Label
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<LabelProps> = (props) => (<Label {...props} />);


export const Overview = Template.bind({});
