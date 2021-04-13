import * as React from 'react';
import clsx from 'clsx';

import { classByKey, isValue } from '@appbuckets/react-ui-core';

import { MinimalAppBucketsComponentProps, AppBucketsColor } from '../../generic';

import { StrictSharedProgressProps } from '../Shared.types';


export type ProgressDescriptor = {
  max: number;
  min: number;
  overvalued: boolean;
  percentage: number;
  rawMax: number;
  rawValue: number;
  width: number;
  value: number;
};

export interface ProgressProps<P> {
  className: string;

  progress: ProgressDescriptor;

  rest: Omit<P, keyof StrictSharedProgressProps | 'className'>;
}

type ExtendedSharedProgressProps = MinimalAppBucketsComponentProps<StrictSharedProgressProps>;

export default function useProgressProps<P extends ExtendedSharedProgressProps>(props: P): ProgressProps<P> {

  const {
    appearance,
    className,
    colorSteps: {
      low    : lowStep = 20,
      midLow : midLowStep = 40,
      midHigh: midHighStep = 60,
      high   : highStep = 80
    } = {},
    discreet,
    inverted,
    max: userDefinedMax,
    min: userDefinedMin,
    size,
    value: userDefinedValue,
    ...rest
  } = props;

  const memoizedProgressProps = React.useMemo<Omit<ProgressProps<P>, 'rest'>>(
    () => {

      // ----
      // Normalize Value and Percentage
      // ----
      const tmpValue = Math.round(userDefinedValue * 100) / 100;
      const tmpMax = Math.round(userDefinedMax as number * 100) / 100;

      const progressMin = Math.round(userDefinedMin as number * 100) / 100;

      const hasOverValue = tmpMax < tmpValue;

      const progressValue = hasOverValue ? tmpMax : tmpValue;
      const progressMax = hasOverValue ? tmpValue : tmpMax;

      const progressPercentage = Math.round(((tmpValue - progressMin) / (tmpMax - progressMin)) * 100);
      const progressWidth = Math.round(((progressValue - progressMin) / (progressMax - progressMin)) * 100);


      // ----
      // Build the Class to Define LinearProgress Color
      // ----
      const colorClassName: AppBucketsColor | string | null = (() => {
        /** If is discreet, return null */
        if (discreet) {
          return null;
        }

        /** If an appearance color has been declared, it will win on auto color */
        if (appearance) {
          return appearance;
        }

        if (progressPercentage <= lowStep) {
          return inverted ? 'high' : 'low';
        }

        if (progressPercentage > lowStep && progressPercentage <= midLowStep) {
          return inverted ? 'mid-high' : 'mid-low';
        }

        if (progressPercentage > midLowStep && progressPercentage <= midHighStep) {
          return 'mid';
        }

        if (progressPercentage > midHighStep && progressPercentage <= highStep) {
          return inverted ? 'mid-low' : 'mid-high';
        }

        return inverted ? 'low' : 'high';
      })();


      // ----
      // Build Component Classes and Element Type
      // ----
      const classes = clsx(
        classByKey(hasOverValue, 'overvalued'),
        classByKey(inverted, 'inverted'),
        'progress',
        isValue(size),
        isValue(colorClassName),
        className
      );

      return {
        className: classes,
        progress : {
          max       : progressMax,
          min       : progressMin,
          overvalued: hasOverValue,
          percentage: progressPercentage,
          rawMax    : tmpMax,
          rawValue  : tmpValue,
          width     : progressWidth,
          value     : progressValue
        }
      };

    },
    [
      appearance,
      className,
      discreet,
      highStep,
      inverted,
      lowStep,
      midHighStep,
      midLowStep,
      size,
      userDefinedMax,
      userDefinedMin,
      userDefinedValue
    ]
  );

  return {
    ...memoizedProgressProps,
    rest
  };
}
