import * as React from 'react';
import clsx from 'clsx';

import { useElementType } from '@appbuckets/react-ui-core';
import type { AnyObject, GetElementType } from '@appbuckets/react-ui-core';

import { useMergeThemeProps } from './Theme';
import type { ComponentsPartialProps } from './Theme';


/* --------
 * Internal Types
 * -------- */

/**
 * Configure the composer function to describe a component,
 * setting its displayName, optionally defaultProps and a function
 * that will be used to render the component
 */
interface ComposerOptions<P extends {}, R extends React.ElementType = React.ElementType> {
  /** Set default className */
  className?: string;

  /** The default ElementType */
  defaultElementType?: R;

  /** Default component Props */
  defaultProps?: Partial<React.PropsWithoutRef<P> & React.RefAttributes<R>>;

  /** Compute element Type using function or prop mapping */
  getElementType?: GetElementType<P>;

  /** The component name, used as displayName */
  name: keyof ComponentsPartialProps;

  /** Component render function */
  render?: RenderComposed<P, R>;
}

type RenderComposed<P extends {}, R extends React.ElementType> =
  (ElementType: R, props: RenderProps<P>, ref: React.ForwardedRef<R>) => React.ReactElement<P>;

type RenderProps<P extends {}> = Omit<P, 'as' | 'className'> & { className: string };

type ComposedProps<P extends {}, R extends React.ElementType> = React.PropsWithoutRef<P> & React.RefAttributes<R>;

type ComposedComponent<P extends {}, R extends React.ElementType> = React.ForwardRefExoticComponent<ComposedProps<P, R>>;


/* --------
 * HOC Definition
 * -------- */
export default function composer<P extends AnyObject, R extends React.ElementType = React.ElementType>(
  options: ComposerOptions<P, R>
): ComposedComponent<P, R> {

  // ----
  // Options Deconstruct
  // ----
  const {
    className: defaultComponentClassName,
    defaultElementType,
    defaultProps,
    getElementType,
    name,
    render
  } = options;


  // ----
  // Transform the name into kebab case to be used in classes as default
  // ----
  const kebabCaseName = name
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase())
    .join('-');

  const systemClassName = clsx('ui', `cx__${kebabCaseName}`);


  // ----
  // Component Definition
  // ----
  const Component = React.forwardRef<R, P>((userDefinedProps, ref) => {

    // ----
    // Unify Props with Theme Props
    // ----
    const props = useMergeThemeProps(name, userDefinedProps);


    // ----
    // Internal Hooks
    // ----
    const ElementType = useElementType<P>(Component, props, defaultElementType, getElementType) as React.ElementType;


    // ----
    // Omit Props, removing useless prop
    // ----
    const {
      as,
      className,
      ...rest
    } = props;


    // ----
    // Compute Classes
    // ----
    const classes = clsx(
      systemClassName,
      defaultComponentClassName,
      className
    );


    // ----
    // If custom function as been defined, use it to render the component
    // ----
    if (typeof render === 'function') {
      return render(ElementType as R, { ...rest, className: classes }, ref);
    }


    // ----
    // Extract children and Content from Props
    // ----
    const { children, content } = props;


    // ----
    // Else, render the component using element type and passing props
    // ----
    return (
      <ElementType {...rest} ref={ref} className={classes}>
        {children || content}
      </ElementType>
    );

  });

  /** Set the component displayName */
  Component.displayName = name;

  /** Set the component default props */
  Component.defaultProps = defaultProps;

  /** Return the composed component */
  return Component;

}
