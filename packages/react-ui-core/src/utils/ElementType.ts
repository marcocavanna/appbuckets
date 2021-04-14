import * as React from 'react';

import { PropsWithAs } from '../generic';


/**
 * Compute the React Element Type used to render a Component.
 *
 * First look to get the right type is checking props or default props
 * searching for `as` key.
 *
 * If no `as` key exists, function will use the `getDefault` function
 * to compute the Element Type.
 *
 * getElementType will fallback to `div` element.
 *
 * @param Component A React Component Type
 * @param userDefinedProps The Element props defined when using a Component
 * @param themedProps AppBuckets UI will use themed variable, userDefinedProps will be extended with theme defined
 * @param getDefault A function that must return an Element Type
 */
export function getElementType<P extends {} = {}>(
  Component: React.ComponentType<PropsWithAs<P>>,
  userDefinedProps: PropsWithAs<P>,
  themedProps?: PropsWithAs<P>,
  getDefault?: (props: PropsWithAs<P>) => React.ElementType | undefined
): React.ElementType {
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


/**
 * Hook version of getElementType, return a memoized
 * variable with component
 *
 * Compute the React Element Type used to render a Component.
 *
 * First look to get the right type is checking props or default props
 * searching for `as` key.
 *
 * If no `as` key exists, function will use the `getDefault` function
 * to compute the Element Type.
 *
 * getElementType will fallback to `div` element.
 *
 * @param Component A React Component Type
 * @param userDefinedProps The Element props defined when using a Component
 * @param themedProps AppBuckets UI will use themed variable, userDefinedProps will be extended with theme defined
 * @param getDefault A function that must return an Element Type
 */
export function useElementType<P extends {} = {}>(
  Component: React.ComponentType<PropsWithAs<P>>,
  userDefinedProps: PropsWithAs<P>,
  themedProps?: PropsWithAs<P>,
  getDefault?: (props: PropsWithAs<P>) => React.ElementType | undefined
): React.ElementType {
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
