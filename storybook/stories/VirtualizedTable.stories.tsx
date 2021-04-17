import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import VirtualizedTable from '@appbuckets/react-ui/VirtualizedTable';
import type { VirtualizedTableProps } from '@appbuckets/react-ui/VirtualizedTable';


export default {
  title    : 'Tables/VirtualizedTable',
  component: VirtualizedTable
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<VirtualizedTableProps<any>> = (props) => (<VirtualizedTable {...props} />);


export const Overview = Template.bind({});
