import * as React from 'react';

import { Row, Column } from '../../collections/Grid';
import { Box } from '../../elements/Box';

import Sticky from './Sticky';


export default { title: 'Modules/Sticky' };

export const sticky = () => (
  <Row>
    <Column width={'16'}>
      <Box backgroundColor={'primary'} style={{ height: 3000 }} />
    </Column>
    <Column>
      <Sticky topOffset={32}>
        <Box backgroundColor={'dribble'}>
          Sticky Content
        </Box>
      </Sticky>
    </Column>
  </Row>
);
