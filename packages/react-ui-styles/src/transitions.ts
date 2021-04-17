import * as React from 'react';


/* --------
 * Internal Types
 * -------- */
type TransitionMode = 'enter' | 'exit';
type TransitionModeDependantType<T> = T | Partial<Record<TransitionMode, T>>;

type TransitionDelay = Exclude<React.CSSProperties['transitionDelay'], undefined>;
type TransitionDuration = Exclude<React.CSSProperties['transitionDuration'], undefined>;
type TransitionTimingFunction = Exclude<React.CSSProperties['transitionTimingFunction'], undefined>;

interface TransitionUtilsOptions {
  mode: TransitionMode
}


/* --------
 * Exported Types
 * -------- */
export interface TransitionUtilsProps {
  /** Set transition timing function */
  easing?: TransitionModeDependantType<string>;

  /** CSS Style */
  style?: React.CSSProperties;

  /** Set transition duration */
  timeout?: TransitionModeDependantType<number>;
}

export interface TransitionProps {
  /** Transition Delay */
  delay: TransitionDelay;

  /** Transition duration */
  duration: TransitionDuration;

  /** Transition easing function */
  easing: TransitionTimingFunction;
}


/* --------
 * Internal Functions
 * -------- */
function formatMs(milliseconds: number): string {
  return `${Math.round(milliseconds)}ms`;
}


/* --------
 * Exported Const and Functions
 * -------- */
export const reflow = (node: HTMLElement) => node.scrollTop;

/** Transition Easing constants */
export const easing = {
  ease     : 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  easeIn   : 'cubic-bezier(0.42, 0, 1, 1)',
  easeOut  : 'cubic-bezier(0, 0, 0.58, 1)',
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)'
};


/** Transition Duration constants */
export const duration = {
  fast    : 200,
  standard: 300,
  long    : 450,
  entering: 225,
  leaving : 195
};


/** Get transition props based on easing, style and timeout */
export function getTransitionProps(props: TransitionUtilsProps, options: TransitionUtilsOptions): TransitionProps {
  /** Get props */
  const {
    easing: easingProp,
    style,
    timeout
  } = props;

  /** Build data */
  const durationResult = style?.transitionDuration
    || (typeof timeout === 'object' ? timeout[options.mode] || 0 : timeout || 0);

  const easingResult = style?.transitionTimingFunction
    || (typeof easingProp === 'object' ? easingProp[options.mode] : easingProp);

  return {
    duration: typeof durationResult === 'number' ? formatMs(durationResult as number) : durationResult,
    easing  : easingResult || easing.easeInOut,
    delay   : style?.transitionDelay || formatMs(0)
  };
}


/** Create transition property to apply to CSS transition key */
export function createTransitionStyle(props: string | string[], options: TransitionProps): string {
  const {
    delay   : delayMs,
    duration: durationMs,
    easing  : easingFunction
  } = options;

  return (Array.isArray(props) ? props : [ props ])
    .map((animatedProp) => (
      `${animatedProp} ${durationMs} ${easingFunction} ${delayMs}`
    ))
    .join(', ');
}
