import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Modal from '@appbuckets/react-ui/Modal';
import type { ModalProps } from '@appbuckets/react-ui/Modal';


export default {
  title    : 'Utilities/Modal',
  component: Modal
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<ModalProps> = (props) => (<Modal {...props} />);


export const Overview = Template.bind({});
