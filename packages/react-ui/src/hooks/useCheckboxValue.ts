import * as React from 'react';

import { ClickHandler } from '../generic';

import { CheckboxProps } from '../Checkbox';


export function useCheckboxValue(initialValue?: boolean): readonly [
  boolean,
  ClickHandler<HTMLLabelElement, CheckboxProps>,
  React.Dispatch<React.SetStateAction<boolean | undefined>>
] {

  const [ checked, setChecked ] = React.useState(initialValue);

  const handleCheckboxChange = React.useCallback<ClickHandler<HTMLLabelElement, CheckboxProps>>(
    (e, props) => {
      setChecked(props.checked);
    },
    []
  );

  return [
    checked ?? false,
    handleCheckboxChange,
    setChecked
  ] as const;

}
