import * as React from 'react';

import {
  FormFormik,
  FormikInput,
  FormFormikActionHandler,
  FormikMultiSelect,
  FormikColorPicker,
  FormikDayPicker,
  FormikNumericInput
} from './index';


export default { title: 'Collections/Form', component: FormFormik };


type Contact = {
  color: string,
  name: string,
  options: number[],
  balance: number,
  date: number | null
};

type Choices = {
  id: number,
  code: string
};

export const formikForm = () => {

  const handleSubmit: FormFormikActionHandler<Contact> = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ processed: 'OK' });
      }, 1500);
    });
  };

  const options: Choices[] = [
    { id: 1, code: 'Paperino' },
    { id: 2, code: 'Topolino' },
    { id: 3, code: 'Pluto' },
    { id: 4, code: 'Minnie' },
    { id: 5, code: 'Paperina' }
  ];

  return (
    <FormFormik<Contact>
      onSubmit={handleSubmit}
      submitButton={'Save'}
      initialValues={{
        color  : '#D9E3F0',
        name   : '',
        options: [ 3 ],
        balance: 256,
        date   : null
      }}
    >
      <FormikColorPicker name={'color'} />
      <FormikInput
        name={'name'}
        label={'First Name'}
        icon={'user'}
      />
      <FormikMultiSelect
        label={'Personaggi'}
        name={'options'}
        options={options}
        getOptionLabel={option => option.code}
        getOptionValue={option => option.id}
      />
      <FormikNumericInput
        label={'Conto Corrente'}
        name={'balance'}
        icon={'wallet'}
      />
      <FormikDayPicker name={'date'} />
    </FormFormik>
  );

};
