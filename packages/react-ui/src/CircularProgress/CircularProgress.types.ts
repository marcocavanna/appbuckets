import { UIVoidComponentStrictProps, PropsWithAs } from '../generic';

import { ProgressIndicator, StrictSharedProgressProps } from '../LinearProgress/Shared.types';


export interface CircularProgressProps extends UIVoidComponentStrictProps<PropsWithAs<StrictCircularProgressProps>> {
}

export interface StrictCircularProgressProps extends StrictSharedProgressProps {

  /** Circular Progress could not have any children */
  children?: never;

  /** Content Progress could not have any children */
  content?: never;

  /** Show the Indicator */
  indicator?: ProgressIndicator;

  /**
   * Set the base Circle Radius,
   * this value will be used as a base and blended with size if present.
   * Default to 20
   */
  radius?: number;

  /**
   * Set the base Circle Stroke
   * this value will be used as a base and blended with size if present-
   * Default to 9
   */
  strokeWidth?: number;

}
