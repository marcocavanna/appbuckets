import * as React from 'react';
import { Select } from './index';


export default { title: 'Elements/Select', component: Select };

export const baseSelect = () => {

  return (
    <React.Fragment>
      <Select
        isSearchable={false}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ]}
      />
    </React.Fragment>
  );
};
