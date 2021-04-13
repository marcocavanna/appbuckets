import * as React from 'react';
import { Divider } from './index';


export default { title: 'Elements/Divider', component: Divider };

export const divider = () => (
  <React.Fragment>

    <Divider />

    <Divider>With Content</Divider>

    <Divider textAlign={'left'}>With Left Content</Divider>

    <Divider textAlign={'right'}>With Right Content</Divider>

    <Divider primary>Primary Divider</Divider>

  </React.Fragment>
);
