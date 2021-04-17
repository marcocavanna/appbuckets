import * as React from 'react';
import clsx from 'clsx';

import { Transition } from 'react-transition-group';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

import { childrenUtils, Ref } from '@appbuckets/react-ui-core';

import { useWithDefaultProps } from '../BucketTheme';
import { useForkRef } from '../hooks/useForkRef';
import { createTransitionStyle, getTransitionProps, reflow } from '../utils/transitions';

import { FadeProps } from './Fade.types';


type WithAppearingCallback = (node: HTMLElement, isAppearing: boolean) => void;
type WithoutAppearingCallback = (node: HTMLElement) => void;
type NormalizedCallback = WithAppearingCallback | WithoutAppearingCallback;


/* --------
 * Component Render
 * -------- */
const Fade = React.forwardRef<HTMLElement, FadeProps>((receivedProps, ref) => {

  /** Get component props */
  const props = useWithDefaultProps('fade', receivedProps);

  const {
    appear,
    children,
    easing,
    mountOnEnter,
    style,
    timeout,
    visible,
    unMountOnExit,

    onEnter   : userDefinedOnEnterHandler,
    onExit    : userDefinedOnExitHandler,
    onEntering: userDefinedOnEnteringHandler,
    onExiting : userDefinedOnExitingHandler,
    onEntered : userDefinedOnEnteredHandler,
    onExited  : userDefinedOnExitedHandler
  } = props;

  /** Initialize Ref */
  const nodeRef = React.useRef<HTMLElement>(null);
  const foreignRef = useForkRef<HTMLElement>(children?.ref, ref);
  const handleRef = useForkRef<HTMLElement>(nodeRef, foreignRef);

  /** Normalize transition handler */
  const normalizedTransitionCallback = (callback?: NormalizedCallback): EnterHandler<HTMLElement> | ExitHandler<HTMLElement> => (
    maybeIsAppearing?: boolean
  ) => {
    if (callback && nodeRef.current) {
      const { current: node } = nodeRef;

      /** onEnter and onExit callbacks have different arguments length */
      if (maybeIsAppearing !== undefined) {
        (callback as WithAppearingCallback)(node, maybeIsAppearing);
      }
      else {
        (callback as WithoutAppearingCallback)(node);
      }
    }
  };

  const handleEntering = normalizedTransitionCallback(userDefinedOnEnteringHandler);

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    /** Restart animation */
    reflow(node);

    /** Get transition props */
    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      { mode: 'enter' }
    );

    /** Set CSS for Transition */
    node.style.webkitTransition = createTransitionStyle('opacity', transitionProps);
    node.style.transition = createTransitionStyle('opacity', transitionProps);

    /** Call user defined handler */
    if (userDefinedOnEnterHandler) {
      userDefinedOnEnterHandler(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(userDefinedOnEnteredHandler);

  const handleExiting = normalizedTransitionCallback(userDefinedOnExitingHandler);

  const handleExit = normalizedTransitionCallback((node: HTMLElement) => {
    /** Get transition props */
    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      { mode: 'exit' }
    );

    /** Set CSS for Transition */
    node.style.webkitTransition = createTransitionStyle('opacity', transitionProps);
    node.style.transition = createTransitionStyle('opacity', transitionProps);

    /** Call user defined handler */
    if (userDefinedOnExitHandler) {
      userDefinedOnExitHandler(node);
    }
  });

  const handleExited = normalizedTransitionCallback(userDefinedOnExitedHandler);


  // ----
  // Component Render
  // ----
  return (
    <Transition
      appear={appear}
      in={visible}
      nodeRef={nodeRef}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unMountOnExit}
      timeout={timeout || 300}
      onEnter={handleEnter as EnterHandler<HTMLElement>}
      onEntering={handleEntering as EnterHandler<HTMLElement>}
      onEntered={handleEntered as EnterHandler<HTMLElement>}
      onExit={handleExit as ExitHandler<HTMLElement>}
      onExiting={handleExiting as ExitHandler<HTMLElement>}
      onExited={handleExited as ExitHandler<HTMLElement>}
    >
      {(state) => {

        const classes = clsx(
          state,
          'transitionable fade',
          children?.props.className
        );

        return !childrenUtils.isNil(children) && (
          <Ref innerRef={handleRef}>
            {React.cloneElement(
              children,
              {
                className: classes,
                style    : {
                  visibility: state === 'exited' && !visible ? 'hidden' : undefined,
                  ...style,
                  ...children?.props.style
                }
              }
            )}
          </Ref>
        );
      }}
    </Transition>
  );
});

Fade.displayName = 'Fade';

export default Fade;
