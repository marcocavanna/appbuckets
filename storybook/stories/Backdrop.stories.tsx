import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Backdrop from '@appbuckets/react-ui/src/Backdrop';
import type { BackdropProps } from '@appbuckets/react-ui/src/Backdrop';


export default {
  title    : 'Utilities/Backdrop',
  component: Backdrop
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<BackdropProps> = (props) => (<Backdrop {...props} />);


export const Overview = Template.bind({});
