import * as React from 'react';

import { contextBuilder } from '@appbuckets/react-ui-core';


export interface RadioContext {
  /** Current radio value */
  currentValue: string | number | undefined;

  /** Change current radio value */
  setValue: (e: React.MouseEvent<HTMLLabelElement>, newValue: string | number) => void;
}

const {
  hook    : useRadioContext,
  Provider: RadioContextProvider,
  Consumer: RadioContextConsumer
} = contextBuilder<RadioContext | undefined>();

export {
  useRadioContext,
  RadioContextProvider,
  RadioContextConsumer
};
