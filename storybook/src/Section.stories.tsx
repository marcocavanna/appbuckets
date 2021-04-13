import * as React from 'react';
import { Section } from './index';


export default { title: 'Elements/Section' };

export const section = () => {
  return (
    <React.Fragment>
      <Section
        divided
        icon={'car'}
        label={'Sezione'}
        content={(
          <h4 className={'has-text-right'}>18.650 €</h4>
        )}
        fontWeight={'bold'}
        textColor={'success'}
      />
      <Section
        divided
        label={'Sezione'}
        content={(
          <h4 className={'has-text-right'}>18.650 €</h4>
        )}
        fontWeight={'bold'}
      />
      <Section
        divided
        label={'Sezione'}
        content={(
          <h4 className={'has-text-right'}>18.650 €</h4>
        )}
        fontWeight={'bold'}
      />
    </React.Fragment>
  );
};
