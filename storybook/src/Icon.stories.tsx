import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { Icon } from './index';

import { Box } from '../Box';

import { getBackgroundColor, getElementSize } from '../../stories';

import * as Grid from '../../collections/Grid';


export default { title: 'Elements/Icon', component: Icon };


/* --------
 * Stories
 * -------- */
export const allSolidIcon = () => {

  return (
    <Grid.Row>
      {Object.keys(fas).map(name => (
        <Grid.Column
          key={name}
          width={{
            phoneUp  : 12,
            tabletUp : 6,
            desktopUp: 4
          }}
          content={(
            <Box px={4} py={6} textAlign={'center'} m={4} backgroundColor={'white shade'}>
              <Icon
                unspaced
                name={fas[name].iconName}
                size={'big'}
              />
              <p className={'has-font-semi-bold mt-4'}>{fas[name].iconName}</p>
            </Box>
          )}
        />
      ))}
    </Grid.Row>
  );
};

export const allRegularIcon = () => {

  return (
    <Grid.Row>
      {Object.keys(far).map(name => (
        <Grid.Column
          key={name}
          width={{
            phoneUp  : 12,
            tabletUp : 6,
            desktopUp: 4
          }}
          content={(
            <Box px={4} py={6} textAlign={'center'} m={4} backgroundColor={'white shade'}>
              <Icon
                unspaced
                iconStyle={'far'}
                name={far[name].iconName}
                size={'big'}
              />
              <p className={'has-font-semi-bold mt-4'}>{far[name].iconName}</p>
            </Box>
          )}
        />
      ))}
    </Grid.Row>
  );
};

export const allBrandsIcon = () => {

  return (
    <Grid.Row>
      {Object.keys(fab).map(name => (
        <Grid.Column
          key={name}
          width={{
            phoneUp  : 12,
            tabletUp : 6,
            desktopUp: 4
          }}
          content={(
            <Box px={4} py={6} textAlign={'center'} m={4} backgroundColor={'white shade'}>
              <Icon
                unspaced
                iconStyle={'fab'}
                name={fab[name].iconName}
                size={'big'}
              />
              <p className={'has-font-semi-bold mt-4'}>{fab[name].iconName}</p>
            </Box>
          )}
        />
      ))}
    </Grid.Row>
  );
};


export const iconVariation = () => {

  const clickable = boolean('Clickable', false);
  const bordered = boolean('Bordered', false);
  const disabled = boolean('Disabled', false);
  const spin = boolean('Spin', false);
  const pulse = boolean('Pulse', false);
  const solid = select(
    'Solid',
    [ 'none', 'circle', 'rounded', 'colored circle', 'colored rounded', 'inverted circle', 'inverted rounded' ],
    'none'
  ) as 'circle' | 'rounded' | 'colored circle' | 'colored rounded' | 'inverted circle' | 'inverted rounded';
  const rotate = select(
    'Rotate',
    [ '0', '90', '180', '270' ],
    '0'
  ) as unknown as ('0' | 90 | 180 | 270);
  const flip = select(
    'Flip',
    [ 'none', 'vertical', 'horizontal', 'both' ],
    'none'
  ) as 'vertical' | 'horizontal' | 'both';

  const appearance = getBackgroundColor('primary');
  const size = getElementSize('huge');

  return (
    <Grid.Row columnsAlign={'centered'}>
      <Grid.Column width={6}>
        <Box p={6} textAlign={'center'} backgroundColor={'white shade'}>
          <Icon
            unspaced
            onClick={clickable ? action('Clicked') : undefined}
            appearance={appearance}
            bordered={bordered}
            disabled={disabled}
            size={size}
            solid={(solid as any) === 'none' ? undefined : solid}
            spin={spin}
            rotate={rotate === '0' ? undefined : +rotate as unknown as (90 | 180 | 270)}
            flip={flip}
            name={'box-open'}
            pulse={pulse}
          />
        </Box>
      </Grid.Column>
    </Grid.Row>
  );
};
