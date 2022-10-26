import * as React from 'react';
import clsx from 'clsx';

import deepmerge from 'deepmerge';
import realyFastDeepClone from 'rfdc';

import type { AnyObject } from '@appbuckets/react-ui-core';

import type { ComponentsPartialProps, ThemeProviderProps } from './Theme.types';

import { defaultTheme } from './Theme.defaults';


/* --------
 * Utilities
 * -------- */
const deepClone = realyFastDeepClone();


/* --------
 * Theme Context Builder and Provider Definition
 * -------- */
const ThemeContext = React.createContext<ComponentsPartialProps | undefined>(undefined);

const ThemeProvider: React.FunctionComponent<React.PropsWithChildren<ThemeProviderProps>> = (props) => {

  // ----
  // Props Deconstruct
  // ----
  const {
    children,
    extend,
    theme: themeStart
  } = props;


  // ----
  // Theme builder
  // ----
  const theme: ComponentsPartialProps = React.useMemo(
    () => deepmerge.all([ themeStart ?? defaultTheme, ...(extend || []) ]) as ComponentsPartialProps,
    [ themeStart, extend ]
  );


  // ----
  // Component Render
  // ----
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );

};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;


/* --------
 * Hooks Definition
 * -------- */

/**
 * Return the current theme object.
 * If context is not being used, the default theme object is returned
 */
export const useTheme = (): ComponentsPartialProps => React.useContext(ThemeContext) ?? defaultTheme;


/**
 * Return defined default component props for a specific component
 * @param name The component name
 */
export function useComponentDefaultProps<C extends keyof ComponentsPartialProps>(name: C): ComponentsPartialProps[C] {
  /** Get current theme from context */
  const theme = useTheme();

  /** Return a deep copy of default props for requested component */
  return React.useMemo(
    () => deepClone(theme[name]),
    [ name, theme ]
  );
}


/**
 * Merge a props object with default defined on theme
 * @param name The name of the Component
 * @param props Received props while rendering the component
 */
export function useMergeThemeProps<C extends keyof ComponentsPartialProps, Props extends ComponentsPartialProps[C]>(
  name: C,
  props: Props
): Props {
  /** Get component default props from theme */
  const defaultComponentProps = useComponentDefaultProps(name);

  /** Merge default props with component props */
  const unifiedProps = deepmerge(defaultComponentProps, props) as Props;

  /** Merge className string if exists */
  if ((defaultComponentProps as AnyObject).className || (props as AnyObject).className) {
    (unifiedProps as AnyObject).className = clsx(
      (defaultComponentProps as AnyObject).className,
      (props as AnyObject).className
    );
  }

  /** Merge style object, if exists */
  if ((defaultComponentProps as AnyObject).style || (props as AnyObject).style) {
    (unifiedProps as AnyObject).style = { ...(defaultComponentProps as AnyObject).style, ...(props as AnyObject).style };
  }

  /** Return unified props */
  return unifiedProps;
}


/**
 * HOC definition used to merge props while creating and rendering
 * a React ClassComponent
 * @param name
 * @param Component
 */
export function withComponentDefaultProps<C extends keyof ComponentsPartialProps, Props extends ComponentsPartialProps[C]>(
  name: C,
  Component: React.ComponentType<Props>
): React.FunctionComponent<Props> {
  /** Return a new wrapping function component */
  const WrapperComponent: React.FunctionComponent<Props> = (receivedProps) => {
    /** Merge the props with the theme object */
    const props = useMergeThemeProps(name, receivedProps);

    /** Render the component */
    return <Component {...props as any} />;
  };

  WrapperComponent.displayName = `Themed${name}`;

  return WrapperComponent;
}
