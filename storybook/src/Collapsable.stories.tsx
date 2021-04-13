import * as React from 'react';
import { Button } from '../../elements/Button';
import { Header } from '../../elements/Header';
import Collapsable from './Collapsable';


export default { title: 'Modules/Collapsable' };

export const collapsable = () => {
  return (
    <React.Fragment>
      <Collapsable
        trigger={<Button content={'Toggle'} />}
        content={(
          <Header
            content={'Hello'}
            subheader={'I am Collapsable Content'}
          />
        )}
      />
      <Collapsable
        trigger={<Button content={'Toggle'} />}
        content={(
          <Header
            content={'Hello'}
            subheader={'I am Collapsable Content'}
          />
        )}
      />
    </React.Fragment>
  );
};
