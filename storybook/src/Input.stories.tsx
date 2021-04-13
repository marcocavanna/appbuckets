import * as React from 'react';

import { Input, InputProps } from '.';
import { useInputValue } from '../../hooks/useInputValue';


export default { title: 'Elements/Input', component: Input };


export const defaultInput = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ value, handleInputChange ] = useInputValue('');

  return (
    <Input
      clearable
      value={value}
      onChange={handleInputChange}
      placeholder={'Il tuo Nome'}
      label={'Nome'}
      actions={[
        {
          key    : 1,
          icon   : 'check',
          tooltip: 'Conferma'
        },
        {
          key    : 2,
          icon   : 'times',
          tooltip: 'Conferma'
        }
      ]}
      icon={{
        name: 'user'
      }}
      iconPosition={'right'}
    />
  );
};


export const defaultTextarea = () => {
  return (
    <Input
      textarea
      placeholder={'Scrivi un commento...'}
      actions={[
        {
          key    : 1,
          icon   : 'check',
          tooltip: 'Conferma'
        },
        {
          key    : 2,
          icon   : 'times',
          tooltip: 'Conferma'
        }
      ]}
      icon={{
        name: 'user'
      }}
    />
  );
};


export const maskedInput = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ value, setValue ] = React.useState('');

  const handleInputChange = (e: React.FormEvent, props: InputProps) => {
    setValue(props.value ?? '');
  };

  return (
    <Input
      masked={{
        mask    : '99/99/9999',
        maskChar: '-'
      }}
      value={value}
      onChange={handleInputChange}
    />
  );
};
