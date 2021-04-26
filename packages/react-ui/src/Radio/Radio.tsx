import * as React from 'react';
import clsx from 'clsx';

import { useAutoControlledValue, childrenUtils } from '@appbuckets/react-ui-core';

import { UIMutableVoidComponent } from '../generic';

import { useWithDefaultProps } from '../BucketTheme';
import { useField } from '../hooks/useField';

import { useSharedClassName } from '../utils';

import Field from '../Field';

import RadioOption from './RadioOption';
import { RadioContext, RadioContextProvider } from './Radio.context';
import { RadioProps } from './Radio.types';


/* --------
 * Component Definition
 * -------- */
type RadioGroupChildren = { Option: typeof RadioOption };

const Radio: UIMutableVoidComponent<RadioProps> & RadioGroupChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('radio', receivedProps);

  const {
    className,
    rest: {
      /** Strict RadioGroup Props */
      children,
      columnsCount,
      content,
      defaultValue: userDefinedDefaultValue,
      onChange    : userDefinedOnChangeHandler,
      options,
      stacked,
      value: userDefinedValue,

      ...rawRest
    }
  } = useSharedClassName(props);


  // ----
  // AutoController Radio Value
  // ----
  const [ value, trySetValue ] = useAutoControlledValue(undefined, {
    prop       : userDefinedValue,
    defaultProp: userDefinedDefaultValue
  });


  // ----
  // Build Field and Helpers
  // ----
  const { fieldRef, fieldProps, rest, ...helpers } = useField(rawRest);


  // ----
  // Context Value
  // ----
  const ctx: RadioContext = {
    currentValue: value,
    setValue    : (event, newValue) => {
      /** Set the field as touched and dirty */
      helpers.setFieldChanged();
      helpers.setFieldClicked();
      /** Call user defined handler if exists */
      if (typeof userDefinedOnChangeHandler === 'function') {
        userDefinedOnChangeHandler(event, { ...props, value: newValue });
      }
      /** Try to change the value */
      trySetValue(newValue);
    }
  };


  // ----
  // Render the Component
  // ----
  const classes = clsx(
    'radio-group',
    { stacked },
    className
  );

  if (Array.isArray(options)) {
    return (
      <RadioContextProvider value={ctx}>
        <Field ref={fieldRef} {...fieldProps} className={classes}>
          {options.map((option) => RadioOption.create(option, {
            autoGenerateKey: false,
            defaultProps   : {
              appearance: fieldProps.appearance,
              danger    : fieldProps.danger,
              info      : fieldProps.info,
              primary   : fieldProps.primary,
              secondary : fieldProps.secondary,
              success   : fieldProps.success,
              warning   : fieldProps.warning
            }
          }))}
        </Field>
      </RadioContextProvider>
    );
  }

  return (
    <RadioContextProvider value={ctx}>
      <Field ref={fieldRef} {...fieldProps} className={classes}>
        {childrenUtils.isNil(children) ? content : children}
      </Field>
    </RadioContextProvider>
  );

};

Radio.Option = RadioOption;

Radio.displayName = 'Radio';

export default Radio;
