import { ShorthandContent } from '@appbuckets/react-ui-core';

import { PropsWithAs, UIComponentStrictProps } from '../generic';

import { ProgressIndicator, StrictSharedProgressProps } from './Shared.types';


export interface LinearProgressProps extends UIComponentStrictProps<PropsWithAs<StrictLinearProgressProps>> {

}

export interface StrictLinearProgressProps extends StrictSharedProgressProps {
  /** Show the Indicator */
  indicator?: ProgressIndicator;

  /** Show Progress Limits */
  limits?: boolean | ((value: number) => ShorthandContent);

  /** Reverse Linear Logic, value will start from right */
  reverse?: boolean;
}
