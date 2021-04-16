import * as React from 'react';


type TransitionMode = 'enter' | 'exit';
type TransitionModeDependantType<T> = T | Partial<Record<TransitionMode, T>>;

type TransitionDelay = React.CSSProperties['transitionDelay'];
type TransitionDuration = React.CSSProperties['transitionDuration'];
type TransitionTimingFunction = React.CSSProperties['transitionTimingFunction'];

export interface TransitionUtilsProps {
  /** Set transition timing function */
  easing?: TransitionModeDependantType<TransitionTimingFunction>;

  /** CSS Style */
  style?: React.CSSProperties;

  /** Set transition duration */
  timeout?: TransitionModeDependantType<number>;
}

interface TransitionUtilsOptions {
  mode: TransitionMode
}

interface TransitionProps {
  /** Transition Delay */
  delay: TransitionDelay;

  /** Transition duration */
  duration: TransitionDuration;

  /** Transition easing function */
  easing: TransitionTimingFunction;
}

function formatMs(milliseconds: number | string): string {
  return typeof milliseconds === 'number' ? `${Math.round(milliseconds)}ms` : milliseconds;
}

export const reflow = (node: HTMLElement) => node.scrollTop;

export function getTransitionProps(props: TransitionUtilsProps, options: TransitionUtilsOptions): TransitionProps {
  /** Get props */
  const { easing, style, timeout } = props;

  return {
    duration: style?.transitionDuration
      || (
        typeof timeout === 'object'
          ? formatMs(((timeout as Partial<Record<TransitionMode, TransitionDuration>>)[options.mode] || 0))
          : formatMs(timeout || 0)
      ),
    easing  : style?.transitionTimingFunction
      || (
        typeof easing === 'object'
          ? ((easing as Partial<Record<TransitionMode, TransitionTimingFunction>>)[options.mode] || 'ease-in-out')
          : easing || 'ease-in-out'
      ),
    delay   : style?.transitionDelay
  };
}

export function createTransitionStyle(props: string | string[], options: TransitionProps): string {
  const { delay, duration, easing } = options;

  return (Array.isArray(props) ? props : [ props ])
    .map((animatedProp) => (
      [
        animatedProp,
        duration,
        easing,
        delay
      ].filter(value => typeof value === 'string' && !!value.length).join(' ')
    ))
    .join(', ');
}
