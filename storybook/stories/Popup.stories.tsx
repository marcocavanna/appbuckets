import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Popup from '@appbuckets/react-ui/Popup';
import type { PopupProps } from '@appbuckets/react-ui/Popup';


export default {
  title    : 'Utilities/Popup',
  component: Popup
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<PopupProps> = (props) => (<Popup {...props} />);


export const Overview = Template.bind({});
