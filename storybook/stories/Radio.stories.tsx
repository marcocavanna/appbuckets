import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Radio from '@appbuckets/react-ui/Radio';
import type { RadioProps } from '@appbuckets/react-ui/Radio';


export default {
  title    : 'Input/Radio',
  component: Radio
} as Meta;


/* --------
 * Component Template
 * -------- */
export const Overview: Story<RadioProps> = () => {

  return (
    <Radio
      defaultValue={'option-3'}
      label={'Choose One'}
      options={new Array(6).fill(1).map((_, ix) => ({
        value: `option-${ix}`,
        label: `Option ${ix}`
      }))}
    />
  );
};
