import * as React from 'react';

import { PropsWithAs } from '@appbuckets/react-ui-core';

import getSharedClassNames, {
  SharedClassNamesAndProps,
  SharedProps
} from './getSharedClassNames';

import splitStateClassName, { SplitStateClassName } from './splitStateClassName';

import { SharedComponentStateProps } from '../generic';


/**
 * Export a function to use the correct
 * element type, wrapped by a react useMemo
 * hook function
 */
function getElementType<P = {}>(
  Component: React.ComponentType<PropsWithAs<P>>,
  userDefinedProps: PropsWithAs<P>,
  themedProps: PropsWithAs<P> | undefined,
  getDefault?: ((props: PropsWithAs<P>) => React.ElementType | undefined)
): React.ElementType | string {

  // Get Component defaultProps
  const { defaultProps } = Component;

  // Return user defined ElementType
  if (userDefinedProps.as && userDefinedProps.as !== defaultProps?.as) {
    return userDefinedProps.as;
  }

  // Use the getDefault function to calculate the element
  if (typeof getDefault === 'function') {
    const elementType = getDefault(themedProps ?? userDefinedProps);

    if (elementType) {
      return elementType;
    }
  }

  // If props include href property, return an anchor element
  if (userDefinedProps.href) {
    return 'a';
  }

  // Return the defaultProps, or fallback to div element
  return defaultProps?.as || themedProps?.as || 'div';

}

export function useElementType<P = {}>(
  Component: React.ComponentType<PropsWithAs<P>>,
  userDefinedProps: PropsWithAs<P>,
  themedProps: PropsWithAs<P> | undefined,
  getDefault?: ((props: PropsWithAs<P>) => React.ElementType | undefined)
): React.ElementType | string {
  /** Deconstruct data */
  const { as: userDefinedAs, href: userDefinedHref } = userDefinedProps;
  const { as: defaultDefinedAs, href: defaultDefinedHref } = themedProps || { href: undefined };
  const { as: defaultAsFromComponent } = Component.defaultProps || { as: undefined };

  return React.useMemo(
    () => getElementType(Component, userDefinedProps, themedProps, getDefault),
    // eslint-disable-next-line
    [
      defaultAsFromComponent,
      userDefinedAs,
      userDefinedHref,
      defaultDefinedAs,
      defaultDefinedHref,
      getDefault
    ]
  );
}


/**
 * Export a function to use the correct
 * shared className, wrapped by a react useMemo
 */
export function useSharedClassName<P>(props: P): Readonly<SharedClassNamesAndProps<P>> {

  /** Extract Props used to build shared className string */
  const {
    as,
    backgroundColor,
    className,
    columnsAlign,
    display,
    fontWeight,
    width,
    offsetBy,
    size,
    textAlign,
    textColor,
    verticalAlign,
    withoutGap,
    ...rest
  } = props as P & SharedProps;

  /** Use a memoized value to build classes */
  const classes = React.useMemo(
    (): string => getSharedClassNames({
      backgroundColor,
      className,
      columnsAlign,
      display,
      fontWeight,
      width,
      offsetBy,
      size,
      textAlign,
      textColor,
      verticalAlign,
      withoutGap
    }).className,
    [
      backgroundColor,
      className,
      columnsAlign,
      display,
      fontWeight,
      width,
      offsetBy,
      size,
      textAlign,
      textColor,
      verticalAlign,
      withoutGap
    ]
  );

  /** Return className and rest props */
  return { className: classes, rest } as Readonly<SharedClassNamesAndProps<P>>;
}


/**
 * Export a function to split the state className
 * from component Props
 */
export function useSplitStateClassName<P extends SharedComponentStateProps>(props: P): Readonly<SplitStateClassName<P>> {

  const {
    appearance,
    danger,
    info,
    primary,
    secondary,
    success,
    warning,
    ...rest
  } = props;

  /** Use a memoized value to build classes */
  const [ classes, , state ] = React.useMemo(
    () => splitStateClassName({
      appearance,
      danger,
      info,
      primary,
      secondary,
      success,
      warning
    }),
    [
      appearance,
      danger,
      info,
      primary,
      secondary,
      success,
      warning
    ]
  );

  return [ classes, rest, state ] as unknown as Readonly<SplitStateClassName<P>>;
}
