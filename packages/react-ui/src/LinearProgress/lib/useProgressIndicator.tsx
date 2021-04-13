import * as React from 'react';

import { ProgressIndicator } from '../Shared.types';

import { ProgressDescriptor } from './useProgressProps';


export default function useProgressIndicator(
  indicator: ProgressIndicator, progress: ProgressDescriptor
) {
  const indicatorValue = indicator && (
    typeof indicator === 'string' || indicator === true
      ? (
        indicator === 'percent'
          ? `${progress.percentage}%`
          : `${progress.rawValue}/${progress.rawMax}`
      )
      : indicator(progress.rawValue)
  );

  return React.useMemo(
    () => {
      if (!indicator) {
        return null;
      }

      return (
        <div className={'indicator'}>
          {indicatorValue}
        </div>
      );
    },
    [ indicator, indicatorValue ]
  );
}
