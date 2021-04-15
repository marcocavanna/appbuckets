import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Dropzone from '@appbuckets/react-ui/src/Dropzone';
import type { DropzoneProps } from '@appbuckets/react-ui/src/Dropzone';


export default {
  title    : 'Input/Dropzone',
  component: Dropzone
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<DropzoneProps> = (props) => (<Dropzone {...props} />);


export const Overview = Template.bind({});
