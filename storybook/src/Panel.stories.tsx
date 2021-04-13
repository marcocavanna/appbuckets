import * as React from 'react';

import { Panel } from './index';

import { LoremIpsum } from '../../stories';


export default { title: 'Elements/Panel', component: Panel };


/* --------
 * Stories
 * -------- */
export const panel = () => {

  return (
    <Panel
      header={{
        content  : 'Panel Header',
        subheader: 'Panel Subheader',
        icon     : 'truck-loading'
      }}
      content={<LoremIpsum />}
      footer={{
        content: 'Panel Footer Content'
      }}
      fab={[
        { key: 1, icon: 'plus', primary: true },
        { key: 2, icon: 'trash', danger: true }
      ]}
    />
  );

};
