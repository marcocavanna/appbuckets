import * as React from 'react';

import { Tabs } from '.';


export default { title: 'Collections/Tabs', component: Tabs };

export const baseTabs = () => {
  return (
    <Tabs
      panels={[
        { trigger: 'Pannello 1', panel: () => <h1>Pannello 1</h1> },
        { trigger: 'Pannello 2', panel: () => <h1>Pannello 2</h1> }
      ]}
    />
  );
};
