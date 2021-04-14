import { Key, ReactNode } from 'react';
import * as React from 'react';


/** Generic Object */
export type AnyObject = { [key: string]: any };


/**
 * Any Content that could be rendered
 * using React
 */
export type ShorthandContent = React.ReactNode;


/**
 * The Component to use to make a Shorthand
 * factory function
 */
export type ShorthandedComponent<P> = React.ElementType | React.ComponentType<P>;


/**
 * The value that could be passed to a Shorthand factory function
 * If node will be passed, the inner component will reflect node.
 * If props object will be passed, they will be applied to
 * the Shorthanded Component
 */
export type ShorthandValue<P> =
  | React.ReactNode
  | (P & AnyObject);

// TODO: Check if the function has been used
// | ((Component: ShorthandedComponent<P>, props: P, children: React.ReactNode) => React.ReactElement);


/**
 * A shorthand item.
 * This type could be used in type declaration
 * to set a prop as a item shorthand generator
 */
export type ShorthandItem<P> = ReactNode | P;
export type ShorthandCollection<P> = ShorthandItem<P & { key: Key }>[];


/**
 * Options that must be passed to shorthand
 * factory function
 */
export interface ShorthandMethodOptions<P> {
  /** Auto Generate Key on Iteration */
  autoGenerateKey: boolean;

  /** Default Props to set */
  defaultProps?: P;

  /** Props that override computed ones */
  overrideProps?: P | ((props: P) => P);
}


/**
 * A creatable function component type is useful
 * to describe React component who has 'create'
 * shorthand method
 */
export type CreatableFunctionComponent<P> =
  & React.FunctionComponent<P>
  & { create: (value: ShorthandValue<P>, options: ShorthandMethodOptions<P>) => React.ReactElement<P> | null };


/**
 * Augment component props including an
 * optional as type to edit the Element
 * used to render the a Component
 */
export type PropsWithAs<P extends {} = {}> =
  & React.PropsWithChildren<P>
  & { as?: React.ElementType }
  & { [key: string]: any };
