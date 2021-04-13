import { ElementSize, AppBucketsColor, ShorthandContent } from '../generic';


export type ProgressColorSteps = {
  low?: number;
  midLow?: number;
  midHigh?: number;
  high?: number;
};

export type ProgressIndicator = boolean | 'percent' | ((value: number) => ShorthandContent);


export interface StrictSharedProgressProps {
  /** Define the LinearProgress appearance color */
  appearance?: AppBucketsColor;

  /** Set Color Steps, in percentage */
  colorSteps?: ProgressColorSteps;

  /** Disable all color, event if appearance has been declared */
  discreet?: boolean;

  /** Invert the automatic color logic */
  inverted?: boolean;

  /** Maximum progress value, default to 100 */
  max?: number;

  /** Minimum progress value, default to 0 */
  min?: number;

  /** Change LinearProgress Size */
  size?: ElementSize;

  /** Current LinearProgress Value */
  value: number;
}
