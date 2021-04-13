import * as React from 'react';

import { Checkbox } from '.';


export default { title: 'Elements/Checkbox', component: Checkbox };

export const baseCheckbox = () => {

  return (
    <React.Fragment>
      <Checkbox
        danger
        label={'I Accept TOS and Privacy Policy'}
      />

      <Checkbox
        switch
        danger
        disabled
        checked
        label={'A New Switch Checkbox'}
      />
    </React.Fragment>
  );

};
