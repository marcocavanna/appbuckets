import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import AutoSpacer from '@appbuckets/react-ui/AutoSpacer';
import type { AutoSpacerProps } from '@appbuckets/react-ui/AutoSpacer';


export default {
  title    : 'Utilities/AutoSpacer',
  component: AutoSpacer
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<AutoSpacerProps> = (props) => (<AutoSpacer {...props} />);


export const Overview = Template.bind({});
