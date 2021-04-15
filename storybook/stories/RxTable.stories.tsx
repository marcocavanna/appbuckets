import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import RxTable from '@appbuckets/react-ui/src/RxTable';
import type { RxTableProps } from '@appbuckets/react-ui/src/RxTable';


export default {
  title    : 'Tables/RxTable',
  component: RxTable
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<RxTableProps<any>> = (props) => (<RxTable {...props} />);


export const Overview = Template.bind({});
