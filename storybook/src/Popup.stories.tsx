import * as React from 'react';

import { Popup } from '.';
import { Box } from '../../stories';


export default { title: 'Modules/Popup', component: Popup };


export const basePopup = () => (
  <Popup
    basic={false}
    inverted={false}
    openOn={[ 'click' ]}
    content={{
      content  : 'Popup',
      subheader: 'Popup Content'
    }}
    trigger={<div><Box /></div>}
  />
);
