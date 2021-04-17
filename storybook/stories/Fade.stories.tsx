import { Button } from '@appbuckets/react-ui';
import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Fade from '@appbuckets/react-ui/Fade';
import type { FadeProps } from '@appbuckets/react-ui/Fade';


export default {
  title    : 'Utilities/Fade',
  component: Fade
} as Meta;


/* --------
 * Component Template
 * -------- */
const Template: Story<FadeProps> = (props) => (
  <Fade {...props}>
    <Button content={'Sono Qui'} />
  </Fade>
);


export const Overview = Template.bind({});
Overview.args = { visible: true };
