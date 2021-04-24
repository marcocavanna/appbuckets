import * as React from 'react';
import clsx from 'clsx';

import kindOf from 'kind-of';

import {
  AnyObject,
  ShorthandMethodOptions,
  ShorthandedComponent,
  ShorthandValue
} from '@appbuckets/react-ui-core';


/* --------
 * Internal Types
 * -------- */
type ShorthandPropsMapper<P> = (value: ShorthandValue<P>) => Partial<P>;

interface ShorthandComponentProps extends AnyObject {
  /** Main component content */
  children?: React.ReactNode | null;

  /** Defined className */
  className?: string;

  /** Component key */
  key?: React.Key;

  /** Style to merge */
  style?: React.CSSProperties;
}


/* --------
 * Main Create Shorthand Function
 * -------- */

/**
 * A more robust React.createElement.
 * It can create elements from primitive values.
 *
 * @param Component Component to Create
 * @param mapValueToProps Function to transform props
 * @param getKey Function to get key from props
 * @param value Value to use
 * @param options Options to Apply
 */
export function createShorthand<P extends ShorthandComponentProps = {}>(
  Component: ShorthandedComponent<P>,
  mapValueToProps: ShorthandPropsMapper<P>,
  getKey: ((props: P) => React.Key) | undefined,
  value: ShorthandValue<P>,
  options: ShorthandMethodOptions<P>
): React.ReactElement<P> | null {

  /** If no value, return an empty component */
  if (value == null || typeof value === 'boolean') {
    return null;
  }

  // Check value type
  const valueIsString = kindOf(value) === 'string';
  const valueIsNumber = kindOf(value) === 'number';
  const valueIsReactElement = React.isValidElement(value);
  const valueIsPropsObject = kindOf(value) === 'object';
  const valueIsPrimitiveValue = valueIsString || valueIsNumber || kindOf(value) === 'array';

  // Check value validity
  if (!valueIsReactElement && !valueIsPrimitiveValue && !valueIsPropsObject) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(
        [
          'Shorthand value must be a string|number|array|object|ReactElement|function.',
          'Use null|undefined|boolean for none.',
          `Received ${kindOf(value)}`
        ].join(' ')
      );
    }
    return null;
  }

  /** Build Props */
  const { defaultProps } = options;

  // Get user props
  const userProps: P = (valueIsReactElement && (value as React.ReactElement).props)
    || (valueIsPropsObject && (value as P))
    || (valueIsPrimitiveValue && mapValueToProps(value))
    || {} as P;

  // Override Props
  let { overrideProps } = options;

  if (typeof overrideProps === 'function') {
    overrideProps = (overrideProps as ((props: P) => P))({
      ...defaultProps,
      ...userProps
    });
  }

  // Merge Props together
  const props: P = {
    ...defaultProps,
    ...userProps,
    ...overrideProps
  };

  // Merge className
  if (defaultProps?.className || overrideProps?.className || userProps.className) {
    const mergedClassNames = clsx(
      defaultProps?.className,
      userProps.className,
      overrideProps?.className
    );

    props.className = Array.from(new Set(mergedClassNames.split(' ')).values()).join(' ');
  }

  // Merge Style
  if (defaultProps?.style || overrideProps?.style || userProps.style) {
    props.style = {
      ...defaultProps?.style,
      ...userProps.style,
      ...overrideProps?.style
    };
  }

  // Create the Key
  if (props.key == null) {
    const { autoGenerateKey, childKey } = options;

    if (typeof getKey === 'function') {
      props.key = getKey(props);
    }
    else if (childKey != null) {
      // Apply and Consume the Child Key props
      props.key = typeof childKey === 'function' ? childKey(props) : childKey;
    }
    else if (autoGenerateKey && (valueIsString || valueIsNumber)) {
      props.key = (value as React.Key);
    }
  }

  // Create the element
  if (valueIsReactElement) {
    return React.cloneElement(value as React.ReactElement, props);
  }

  // Render as Component
  if (valueIsPrimitiveValue || valueIsPropsObject) {
    return (
      <Component {...props} />
    );
  }

  // Render as Function
  if (typeof value === 'function') {
    return value(Component, props, props.children);
  }

  // Fallback to null
  return null;
}


/* --------
 * Create a function to create shorthand factory
 * -------- */

/**
 * Get a callback function to be used to easily generate
 * a new component based on shorthand value
 *
 * @param Component The Component to Generate
 * @param mapValueToProps The function to map value to props
 * @param getKey A function that will be used to get key
 */
export function createShorthandFactory<P>(
  Component: ShorthandedComponent<P>,
  mapValueToProps: ShorthandPropsMapper<P>,
  getKey?: (props: P) => React.Key
) {
  return function createFactoryElement(
    value: ShorthandValue<P>,
    options: ShorthandMethodOptions<P>
  ) {
    return createShorthand(Component, mapValueToProps, getKey, value, options);
  };
}

export const createHTMLLabel = createShorthandFactory<JSX.IntrinsicElements['label']>('label', (val) => ({
  children: val
}));

export const createHTMLInput = createShorthandFactory<JSX.IntrinsicElements['input']>('input', (val) => ({
  type: val as string
}));

export const createHTMLParagraph = createShorthandFactory<JSX.IntrinsicElements['p']>('p', (val) => ({
  children: val
}));
