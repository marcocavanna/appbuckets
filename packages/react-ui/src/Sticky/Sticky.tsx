import * as React from 'react';
import clsx from 'clsx';

import { Sticky as NativeSticky, StickyContainer } from 'react-sticky';

import { childrenUtils } from '@appbuckets/react-ui-core';

import { useElementType, useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { StickyProps } from './Sticky.types';


/* --------
 * Component Render
 * -------- */
const Sticky: React.FunctionComponent<StickyProps> = (receivedProps) => {

  const props = useWithDefaultProps('sticky', receivedProps);

  const {
    className,
    rest: {
      bottomOffset,
      children,
      content,
      disabled,
      disableCompensation,
      disableHardwareAcceleration,
      onStickyStateChange: userDefinedOnStickyStateChange,
      style              : userDefinedStyle,
      topOffset,
      ...rest
    }
  } = useSharedClassName(props);


  // ----
  // Sticky State
  // ----
  const [ isSticky, setIsSticky ] = React.useState(false);


  // ----
  // Get the Right element Type
  // ----
  const ElementType = useElementType(Sticky, receivedProps, props);


  // ----
  // Build Classes
  // ----
  const classes = clsx(
    { disabled },
    'sticky',
    isSticky && 'is-sticky',
    className
  );


  // ----
  // Internal Handlers
  // ----
  const handleStickyStateChange = React.useCallback(
    (nextIsSticky: boolean) => {
      /** If a user defined handler has been set, call it */
      if (typeof userDefinedOnStickyStateChange === 'function') {
        userDefinedOnStickyStateChange(nextIsSticky);
      }

      /** Change sticky state */
      setIsSticky(nextIsSticky);
    },
    [ userDefinedOnStickyStateChange ]
  );

  const getTopStyle = React.useCallback(
    (top?: number): React.CSSProperties => {
      /** If top is not a valid number, return empty style */
      if (typeof top !== 'number') {
        return {};
      }

      /** Adjust the next top using offset */
      return {
        top: top + (topOffset ?? 0)
      };
    },
    [ topOffset ]
  );


  // ----
  // Component Render
  // ----
  return (
    <StickyContainer className={'sticky-container'} style={{ height: '100%' }}>
      <NativeSticky
        bottomOffset={bottomOffset}
        disableCompensation={disableCompensation}
        disableHardwareAcceleration={disableHardwareAcceleration}
        onStickyStateChange={handleStickyStateChange}
        topOffset={(topOffset || 0) * -1}
      >
        {({ style }) => {
          /** Get the adjusted top style */
          const adjustedTopStyle = getTopStyle(style.top as number);

          /** Return the Element */
          return (
            <ElementType
              {...rest}
              className={classes}
              style={{
                ...userDefinedStyle,
                ...style,
                ...adjustedTopStyle
              }}
            >
              {childrenUtils.isNil(children) ? content : children}
            </ElementType>
          );
        }}
      </NativeSticky>
    </StickyContainer>
  );

};

Sticky.displayName = 'Sticky';

export default Sticky;
