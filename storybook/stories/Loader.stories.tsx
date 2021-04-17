import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Loader from '@appbuckets/react-ui/Loader';
import type { LoaderProps } from '@appbuckets/react-ui/Loader';


export default {
  title    : 'Utilities/Loader',
  component: Loader
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<LoaderProps> = (props) => (<Loader {...props} />);


export const Overview = Template.bind({});
