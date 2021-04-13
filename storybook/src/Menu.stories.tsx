import * as React from 'react';

import { Panel } from '../../elements/Panel';
import { Menu } from './index';


export default { title: 'Collections/Menu', component: Menu };


export const baseMenu = () => {
  return (
    <Panel>
      <Panel.Body>
        <Menu
          vertical
          section={'Tools'}
          items={[
            { key: 0, content: 'Pagina 1' },
            { key: 1, content: 'Pagina 2' },
            {
              key    : 3,
              content: 'Test',
              header : true,
              menu   : {
                vertical: true,
                items   : [
                  { key: 0, content: 'Pagina 1' },
                  { key: 1, content: 'Pagina 2' }
                ]
              }
            },
            {
              key    : 4,
              content: 'Test',
              header : true,
              menu   : {
                vertical: true,
                items   : [
                  { key: 0, content: 'Pagina 1' },
                  { key: 1, content: 'Pagina 2', primary: true }
                ]
              }
            }
          ]}
        />
      </Panel.Body>
    </Panel>
  );
};
