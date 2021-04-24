import * as React from 'react';

import {
  CreatableFunctionComponent,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { useWithDefaultProps } from '../BucketTheme';

import Checkbox from '../Checkbox';

import { RadioOptionProps } from './RadioOption.types';
import { useRadioContext } from './Radio.context';


/* --------
 * Component Definition
 * -------- */
const RadioOption: React.VFC<RadioOptionProps> = React.forwardRef<HTMLInputElement, RadioOptionProps>((
  receivedProps, ref
) => {

  const props = useWithDefaultProps('radioOption', receivedProps);

  const {
    /** Strict radio props */
    value,

    /** All other props passed to Checkbox */
    ...rest
  } = props;


  // ----
  // Hook Usage
  // ----
  const {
    currentValue,
    setValue
  } = useRadioContext() || {};


  // ----
  // Render the Component
  // ----
  return Checkbox.create(rest, {
    autoGenerateKey: false,
    overrideProps  : () => ({
      ref,
      checked: !!rest.checked || (currentValue === value),
      radio  : true,
      onClick: (event) => {
        /** Call user defined click event if exists */
        if (typeof rest.onClick === 'function') {
          rest.onClick(event, props);
        }

        /** Set the new value */
        if (typeof setValue === 'function') {
          setValue(event, value);
        }
      }
    })
  });

});

RadioOption.displayName = 'RadioOption';

(RadioOption as CreatableFunctionComponent<RadioOptionProps>).create = createShorthandFactory(
  RadioOption,
  (value) => ({ value: value as string | number }),
  (props) => props.value
);

export default RadioOption as CreatableFunctionComponent<RadioOptionProps>;
