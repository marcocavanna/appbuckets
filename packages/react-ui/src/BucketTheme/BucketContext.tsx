import * as React from 'react';
import clsx from 'clsx';

import realyFastDeepClone from 'rfdc';

import {
  BucketThemeContext,
  ThemeOptions
} from './BucketContext.types';

import { defaultBucketThemeConfig } from './BucketTheme.default';


/* --------
 * Build the Deep Clone Function
 * -------- */
const deepClone = realyFastDeepClone();


/* --------
 * Prebuild the Context
 * -------- */
export const ThemeContext = React.createContext<BucketThemeContext | undefined>(undefined);

function useBucketTheme(): BucketThemeContext {
  /** Get the current context value */
  const currentContext = React.useContext(ThemeContext);

  /** Allow hook call outside content, returning the default object */
  if (!currentContext) {
    return {
      theme: defaultBucketThemeConfig
    };
  }

  /** Return the Context if exists */
  return currentContext;
}


/* --------
 * Define an Hook to get Theme Options
 * -------- */
export function useComponentProps<C extends keyof ThemeOptions>(componentName: C): ThemeOptions[C] {
  /** Get the theme */
  const {
    theme: { [componentName]: componentProps }
  } = useBucketTheme();

  return React.useMemo(
    () => deepClone(componentProps),
    [ componentProps ]
  );
}

export function useWithDefaultProps<C extends keyof ThemeOptions, Props extends ThemeOptions[C]>(
  componentName: C,
  props: React.PropsWithChildren<Props>
): React.PropsWithChildren<Props> {

  /** Get the Theme Component Props */
  const componentProps = useComponentProps(componentName);

  /** Produce props unions */
  const propsUnions = { ...componentProps, ...props };

  /** Merge classNames */
  if ((componentProps as any).className || (props as any).className) {
    (propsUnions as any).className = clsx(
      (componentProps as any).className,
      (props as any).className
    );
  }

  /** Merge style */
  if ((componentProps as any).style || (props as any).style) {
    (propsUnions as any).style = {
      ...(componentProps as any).style,
      ...(props as any).style
    };
  }

  return propsUnions;
}

export function withDefaultProps<C extends keyof ThemeOptions, Props extends {}>(
  componentName: C,
  Component: React.ComponentType<Props>
): React.FunctionComponent<Props> {
  return (receivedProps) => {
    /** Merge props with default */
    const props = useWithDefaultProps(componentName, receivedProps);
    /** Return the Component */
    return (
      <Component
        {...props}
      />
    );
  };
}
