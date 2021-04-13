import * as React from 'react';

import { number } from '@storybook/addon-knobs';

import { Box } from './index';

import { getBackgroundColor } from '../../stories';

import { Spacer } from '../generic';


export default { title: 'Elements/Box' };


/* --------
 * Stories
 * -------- */
export const simpleBox = () => {

  const backgroundColor = getBackgroundColor('cloud light');

  const padding = number(
    'Padding',
    2,
    {
      range: true,
      min  : 0,
      max  : 8,
      step : 1
    }
  ) as Spacer;

  const margin = number(
    'Margin Y',
    2,
    {
      range: true,
      min  : 0,
      max  : 8,
      step : 1
    }
  ) as Spacer;

  return (
    <React.Fragment>
      <Box
        textAlign={'center'}
        backgroundColor={backgroundColor}
        my={margin}
        p={padding}
      >
        First Box Content
      </Box>
      <Box
        textAlign={'center'}
        backgroundColor={backgroundColor}
        my={margin}
        p={padding}
      >
        Second Box Content
      </Box>
    </React.Fragment>
  );

};
