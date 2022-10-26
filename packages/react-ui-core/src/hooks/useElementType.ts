import type * as React from 'react';

import type { AnyObject, KeysMatching } from '../generics';


/* --------
 * Exporting Types
 * -------- */
export type GetElementType<P extends {}> = ((props: P) => React.ElementType | undefined | false) | ElementTypeMapper<P>;


/* --------
 * Internal Types
 * -------- */
interface ElementReliantProps extends AnyObject {
  /** Received props could have the as ElementType set */
  as?: React.ElementType;

  /** Href could be used to define if an Element must be an anchor or not */
  href?: string;
}

type ForwardedComponent<P> = React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<any>>;

type ElementTypeMapper<P extends AnyObject, K extends keyof KeysMatching<P, string> = keyof KeysMatching<P, string>> = {
  map: K,
  using: Partial<Record<P[K], React.ElementType>>,
  default: React.ElementType
};


/* --------
 * Hook Definition
 * -------- */

/**
 * Get the ElementType that must be used to render a Component
 * @param Component The Component to render
 * @param props Props received by Component
 * @param defaultElementType A default element type to use
 * @param getDefault A defined function used to compute the ElementType by props
 */
export function useElementType<Props extends ElementReliantProps = ElementReliantProps>(
  Component: (ForwardedComponent<Props>) | React.ComponentType<Props>,
  props: Props,
  defaultElementType?: React.ElementType,
  getDefault?: GetElementType<Props>
): React.ElementType {

  /** Get default props directly from Component */
  const { defaultProps: componentDefaultProps } = Component;

  /** If received props contains the element type use it to render the component */
  if (props.as && props.as !== componentDefaultProps?.as) {
    return props.as;
  }

  /** If a function has been provided to compute the element type, call it and return the element if exists */
  if (typeof getDefault === 'function') {
    const computedElementType = getDefault(props);

    if (computedElementType) {
      return computedElementType;
    }
  }

  /** If getDefault is an object than is a ElementType mapper using props, compute it and return */
  if (typeof getDefault === 'object') {
    return getDefault.using[props[getDefault.map]] || getDefault.default;
  }

  /** If props include a href key, return anchor element as element type */
  if (props.href) {
    return 'a';
  }

  /** Return element type, falling back to div element */
  return componentDefaultProps?.as || defaultElementType || 'div';
}
