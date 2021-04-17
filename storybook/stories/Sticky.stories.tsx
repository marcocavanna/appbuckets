import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Sticky from '@appbuckets/react-ui/Sticky';
import type { StickyProps } from '@appbuckets/react-ui/Sticky';


export default {
  title    : 'Utilities/Sticky',
  component: Sticky
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<StickyProps> = (props) => (<Sticky {...props} />);


export const Overview = Template.bind({});
