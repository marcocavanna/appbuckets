import * as React from 'react';

import { NumericInput, NumericInputProps } from './index';


export default { title: 'Elements/NumericInput', component: NumericInput };


export const defaultInput = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ value, setValue ] = React.useState<number | null>(123);

  const handleChangeValue = (nothing: null, props: NumericInputProps) => {
    setValue(props.value ?? null);
  };

  const setNewValue = () => {
    setValue(987654);
  };

  return (
    <NumericInput
      precision={2}
      min={12}
      max={65}
      value={value}
      onChange={handleChangeValue}
      actions={[
        {
          key    : 0,
          icon   : 'retweet',
          onClick: setNewValue
        }
      ]}
    />
  );

};
