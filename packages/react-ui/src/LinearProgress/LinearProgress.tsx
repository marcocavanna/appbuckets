import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { useWithDefaultProps } from '../BucketTheme';

import { LinearProgressProps } from './LinearProgress.types';

import useProgressProps from './lib/useProgressProps';
import useProgressIndicator from './lib/useProgressIndicator';


/* --------
 * Component Render
 * -------- */
const LinearProgress: CreatableFunctionComponent<LinearProgressProps> = (
  receivedProps
) => {

  const props = useWithDefaultProps('linearProgress', receivedProps);

  const {
    className,
    progress,
    rest: {
      as,
      children,
      content,
      indicator,
      limits,
      reverse,
      ...rest
    }
  } = useProgressProps(props);

  const ElementType = useElementType(LinearProgress, receivedProps, props);


  // ----
  // Build Indicator Element
  // ----
  const indicatorElement = useProgressIndicator(indicator, progress);

  // ----
  // Build Limits Element
  // ----
  const downLimit = limits && (typeof limits === 'function' ? limits(progress.min) : progress.min);
  const upLimit = limits && (typeof limits === 'function'
    ? limits(progress.overvalued ? progress.value : progress.max)
    : progress.overvalued ? progress.value : progress.max);
  const overValueLimit = progress.overvalued && limits && (
    typeof limits === 'function'
      ? limits(progress.max)
      : progress.max
  );

  const limitsElement = React.useMemo(
    () => {
      if (!limits) {
        return null;
      }

      return (
        <div className={'limits'}>
          <div
            className={'value'}
            style={{
              width: `${progress.overvalued ? progress.width : 100}%`
            }}
          >
            <div className={'down'}>{downLimit}</div>
            <div className={'up'}>{upLimit}</div>
          </div>
          {overValueLimit && (
            <div className={'overvalue'}>
              {overValueLimit}
            </div>
          )}
        </div>
      );
    },
    [ limits, progress.overvalued, progress.width, downLimit, upLimit, overValueLimit ]
  );

  const classes = clsx(
    className,
    {
      reverse,
      'with-limits'   : limitsElement,
      'with-indicator': indicatorElement
    },
    'linear'
  );

  const contentElement = childrenUtils.isNil(children) ? content : children;

  return (
    <ElementType {...rest} className={classes}>
      {limitsElement}
      <div className={'bar'}>
        <div className={'value'} style={{ width: `${progress.width}%` }}>
          {indicatorElement}
        </div>
      </div>
      {contentElement && (
        <div className={'content'}>
          {contentElement}
        </div>
      )}
    </ElementType>
  );
};

LinearProgress.displayName = 'LinearProgress';

LinearProgress.create = createShorthandFactory(LinearProgress, (value) => ({ value: value as number }));

export default LinearProgress;
