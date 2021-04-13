import * as React from 'react';
import { EmptyContent } from './index';
import { Panel } from '../Panel';


export default { title: 'Elements/EmptyContent' };


export const baseEmptyContent = () => {
  return (
    <Panel>
      <EmptyContent
        as={Panel.Body}
        icon={{
          name: 'list'
        }}
        header={'Nessun Elemento'}
        content={'Nessun Elemento è stato trovato'}
        button={{
          content: 'Aggiungi Nuovo',
          rounded: true,
          primary: true
        }}
      />
    </Panel>
  );
};
