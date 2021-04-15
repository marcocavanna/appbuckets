import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Panel from '@appbuckets/react-ui/src/Panel';
import type { PanelProps } from '@appbuckets/react-ui/src/Panel';


export default {
  title    : 'Display/Panel',
  component: Panel
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<PanelProps> = (props) => (<Panel {...props} />);


export const Overview = Template.bind({});
