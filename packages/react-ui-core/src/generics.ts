import type * as React from 'react';


/* --------
 * Utility types
 * -------- */
export type AnyObject = { [key: string]: any };

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P]
};

export type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never };


/* --------
 * Core ReactUI Component Props
 * --
 * Define base property shared between all Components
 * created for ReactUI package
 * -------- */
export type UIMutableComponentProps<P extends {}, BaseType extends keyof JSX.IntrinsicElements> =
  & { as?: React.ElementType }
  & UIComponentProps<P, BaseType>;

export type UIMutableVoidComponentProps<P extends {}, BaseType extends keyof JSX.IntrinsicElements> =
  & { as?: React.ElementType }
  & UIVoidComponentProps<P, BaseType>;

export type UIComponentProps<P extends {}, T extends keyof JSX.IntrinsicElements> =
  & P
  & CoreUIComponentProps
  & Omit<JSX.IntrinsicElements[T], keyof P>;

export type UIVoidComponentProps<P extends {}, T extends keyof JSX.IntrinsicElements> =
  & P
  & CoreUIVoidComponentProps
  & Omit<JSX.IntrinsicElements[T], keyof P>;

/**
 * Any Component that will allow content inside will
 * expose original children property and an extra
 * content property usable as shorthand
 */
export interface CoreUIComponentProps extends CoreUIVoidComponentProps {
  /** User defined children, children always override shorthand content property value */
  children?: React.ReactNode;

  /** Shorthand content prop, if children will be defined, content prop is omitted */
  content?: ShorthandContent;
}

/**
 * Base VoidComponent will allow using
 * only user defined className
 */
export interface CoreUIVoidComponentProps {
  /** User defined className */
  className?: string;
}


/* --------
 * Shorthands
 * --
 * Define easily usable type for Shorthand Content and Component
 * Shorthand could be used to slightly decrease the amount of code to write
 * -------- */
type ShorthandContent = React.ReactNode;
