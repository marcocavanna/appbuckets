import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Container from '@appbuckets/react-ui/src/Container';
import type { ContainerProps } from '@appbuckets/react-ui/src/Container';


export default {
  title    : 'Layout/Container',
  component: Container
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<ContainerProps> = (props) => (<Container {...props} />);


export const Overview = Template.bind({});
