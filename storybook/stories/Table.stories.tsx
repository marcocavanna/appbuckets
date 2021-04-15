import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Table from '@appbuckets/react-ui/src/Table';
import type { TableProps } from '@appbuckets/react-ui/src/Table';


export default {
  title    : 'Tables/Table',
  component: Table
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<TableProps> = (props) => (<Table {...props} />);


export const Overview = Template.bind({});
