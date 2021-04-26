import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useWithDefaultProps } from '../BucketTheme';

import { CircularProgressProps } from './CircularProgress.types';

import useProgressProps from '../LinearProgress/lib/useProgressProps';
import useProgressIndicator from '../LinearProgress/lib/useProgressIndicator';

/* --------
 * Component Render
 * -------- */
const CircularProgress: Creatable<React.VFC<CircularProgressProps>> = (
  receivedProps
) => {

  const props = useWithDefaultProps('circularProgress', receivedProps);

  const {
    className,
    progress,
    rest: {
      as,
      indicator,
      radius,
      strokeWidth,
      style: userDefinedStyle,
      ...rest
    }
  } = useProgressProps(props);

  const ElementType = useElementType(CircularProgress, receivedProps, props);

  const classes = clsx(
    className,
    'circular'
  );


  /** Build the Indicator Element */
  const indicatorElement = useProgressIndicator(indicator, progress);


  // ----
  // Circle Build Value
  // ----
  const circle = React.useMemo<{ radius: number, stroke: number }>(
    () => {

      if (typeof strokeWidth !== 'number' || typeof radius !== 'number') {
        return { radius: 0, stroke: 0 };
      }

      const startingStrokeWidth = indicatorElement ? strokeWidth - 2 : strokeWidth;
      const startingRadius = indicatorElement ? radius + 1 : radius;

      switch (props.size) {
        case 'extra small':
          return { radius: startingRadius / 3, stroke: startingStrokeWidth / 2 };

        case 'small':
          return { radius: startingRadius / 1.75, stroke: startingStrokeWidth / 1.5 };

        case 'large':
          return { radius: startingRadius * 1.75, stroke: startingStrokeWidth * 1.5 };

        case 'big':
          return { radius: startingRadius * 3, stroke: startingStrokeWidth * 2.5 };

        case 'huge':
          return { radius: startingRadius * 4.5, stroke: startingStrokeWidth * 4 };

        default:
          return { radius: startingRadius, stroke: startingStrokeWidth };
      }
    },
    [ indicatorElement, strokeWidth, radius, props.size ]
  );

  const size = Math.ceil((circle.radius * 2) + circle.stroke);

  const viewBox = [ 0, 0, size, size ].join(' ');
  const dashArray = circle.radius * Math.PI * 2;
  const dashOffset = dashArray - ((dashArray * progress.width) / 100);


  return (
    <ElementType
      {...rest}
      className={classes}
      style={{
        ...userDefinedStyle,
        height: `${size}px`,
        width : `${size}px`
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
      >
        <circle
          className={'bar'}
          cx={size / 2}
          cy={size / 2}
          r={circle.radius}
          strokeWidth={`${circle.stroke}px`}
        />
        <circle
          className={'value'}
          cx={size / 2}
          cy={size / 2}
          r={circle.radius}
          strokeWidth={`${circle.stroke}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray : dashArray,
            strokeDashoffset: dashOffset
          }}
        />
      </svg>
      {indicatorElement}
    </ElementType>
  );

};

CircularProgress.displayName = 'CircularProgress';

CircularProgress.create = createShorthandFactory(CircularProgress, (value) => ({ value: value as number }));

export default CircularProgress;
