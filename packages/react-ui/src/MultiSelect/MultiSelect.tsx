import * as React from 'react';

import { useWithDefaultProps } from '../BucketTheme';

import { SelectDefaultOption, SelectOption } from '../Select';
import Select, { SelectComponent } from '../Select/Select';

import { MultiSelectProps } from './MultiSelect.types';


const MultiSelect = <Option extends SelectOption = SelectDefaultOption>(
  receivedProps: React.PropsWithChildren<MultiSelectProps<Option>>
) => {

  const props = useWithDefaultProps('selectMulti', receivedProps);

  return (Select as SelectComponent).create(props as any, {
    autoGenerateKey: false,
    overrideProps  : {
      isMulti: true
    } as any
  });
};

export default MultiSelect;
