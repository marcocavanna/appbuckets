import * as React from 'react';

import { Modal } from './index';

import { Button } from '../../elements/Button';
import { DayPicker } from '../../elements/DayPicker';
import { Select } from '../../elements/Select';


export default { title: 'Modules/Modal', component: Modal };

type Choices = {
  id: number,
  code: string
};

const options: Choices[] = [
  { id: 1, code: 'Paperino' },
  { id: 2, code: 'Topolino' },
  { id: 3, code: 'Pluto' },
  { id: 4, code: 'Minnie' },
  { id: 5, code: 'Paperina' }
];


export const baseModal = () => {
  return (
    <Modal
      trigger={(
        <Button
          content={'Apri Modale'}
        />
      )}
      icon={{
        iconStyle: 'fab',
        name     : 'google',
        primary  : true
      }}
      header={{
        content  : 'Product Designer',
        subheader: 'Cracow, Poland',
        meta     : '3 days ago',
        actions  : [
          <Button
            key={0}
            content={'Some Action!'}
          />
        ]
      }}
      content={(
        <Modal.Content>
          Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen<br />
          Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen<br />
          Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen<br />
          Lorem ipsum dolor sit amen Lorem ipsum dolor sit amen<br />

          <DayPicker />

          <Select
            options={options}
            getOptionLabel={option => option.code}
            getOptionValue={option => option.id}
          />
        </Modal.Content>
      )}
      actions={[
        {
          key    : 0,
          content: 'Cancella'
        },
        {
          key    : 1,
          content: 'Fantastico',
          primary: true
        }
      ]}
      textAlign={'center'}
      size={'small'}
    />
  );
};
