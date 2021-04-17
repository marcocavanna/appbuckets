import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Collapsable from '@appbuckets/react-ui/Collapsable';
import type { CollapsableProps } from '@appbuckets/react-ui/Collapsable';


export default {
  title    : 'Utilities/Collapsable',
  component: Collapsable
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<CollapsableProps> = (props) => (<Collapsable {...props} />);


export const Overview = Template.bind({});
