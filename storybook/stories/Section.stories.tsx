import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Section from '@appbuckets/react-ui/Section';
import type { SectionProps } from '@appbuckets/react-ui/Section';


export default {
  title    : 'Display/Section',
  component: Section
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<SectionProps> = (props) => (<Section {...props} />);


export const Overview = Template.bind({});
