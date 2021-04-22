/// <reference types="@fortawesome/fontawesome-svg-core" />

/* --------
 * Default React Bucket Types Explained
 * All default React Bucket Component Interface
 * will accept any other props passed to component.
 * This Types must be used to declared the StrictComponentInterface
 *
 *  - MinimalAppBucketsComponentProps<P, E>
 *      Has all props of element E and in addition
 *      contains the basic props for a React Bucket Component:
 *        • `as` : The Element Type
 *        • `children` : List of Children
 *        • `className` : User defined classes
 *        • `content` : Shorthand Content
 *
 *  - AppBucketsComponentProps<P, E>
 *      Has all props of MinimalAppBucketsComponentProps and
 *      in addition contains a set of style props
 *        • `backgroundColor` : AppBucketsColor;
 *        • `display` : ResponsiveProps<ElementDisplay>;
 *        • `fontWeight` : FontWeight;
 *        • `size` : ElementSize;
 *        • `textAlign` : ContentAlign;
 *        • `textColor` : AppBucketsColor;
 *
 *  Usage:
 *   // In Types File
 *   export interface ComponentProps extends AppBucketsComponentProps<StrictComponentProps> { }
 *
 *   // In Component
 *   const { className, rest: { __anyStrictProps__, ...rest } } = useSharedClassName;
 *
 *
 * --
 * Extra React Bucket Type Component
 * To declare a Flex component (container or content)
 * must use the FlexboxContainer<P, E> or FlexboxContent<P, E> types
 *
 *
 * --
 * React Bucket Component State Type
 * The SharedComponentStateProps interface could be used to
 * append state props to a component.
 * Only className will be appended to component, all style
 * related to state classNames must be written in SCSS
 * State props are:
 *    • `appearance` : Any React Bucket interface Color;
 *    • `danger` : Boolean prop;
 *    • `info` : Boolean prop;
 *    • `primary` : Boolean prop;
 *    • `secondary` : Boolean prop;
 *    • `success` : Boolean prop;
 *    • `warning` : Boolean prop;
 *
 *  Usage:
 *   // In Types File
 *   export interface StrictComponentProps extends SharedComponentStateProps { }
 *
 *   // In Component
 *   const { className, rest: { __anyStrictProps__, ...rawRest } } = useSharedClassName;
 *   const [ stateClassName, rest ] = useSplitStateClassName(rawRest);
 *
 *   // In SCSS
 *   > .class {
 *     @each $label, $color in $react-bucket-color-map {
 *       &.is-#{$label} {
 *         // Style
 *       }
 *     }
 *   }
 * -------- */
import {
  ReactNode,
  ElementType,
  ChangeEvent,
  FocusEvent,
  MouseEvent
} from 'react';

import {
  ShorthandContent,
  ShorthandItem,
  ShorthandCollection
} from '@appbuckets/react-ui-core';

import { IconName } from '@fortawesome/fontawesome-svg-core';


/* --------
 * Re Export Type from ReactUI Core
 * -------- */
export { ShorthandItem, ShorthandCollection };


/* --------
 * Re Export Icon name from FontAwesome
 * -------- */

/** Generic Object */
export type AnyObject = { [key: string]: any };

export type Merge<P extends {}, T extends {}> = {
  [K in keyof P]: K extends keyof T ? T[K] : P[K]
};

export type Subtract<P extends {}, T extends {}> = {
  [K in keyof P]: K extends keyof T ? never : P[K]
};


/* --------
 * Icon
 * -------- */
export type AppBucketsIcon<T> = IconName | T;


/* --------
 * Component Props Type
 * -------- */
/**
 * Generate a complex AppBuckets Component
 * Props, that could be extended with any key
 */
export type AppBucketsComponentProps<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  MinimalAppBucketsComponentProps<P, E>
  & SharedAppBucketsComponentProps
  & AnyObject;

/**
 * Generate a minimal AppBuckets Component
 * including only structural props
 */
export type MinimalAppBucketsComponentProps<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  P
  & Subtract<CoreAppBucketsComponentProps, P>
  & Subtract<JSX.IntrinsicElements[E], P>
  & AnyObject;

/**
 * Generate a Type Dedicated to Flexbox Container
 */
export type FlexboxContainer<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  AppBucketsComponentProps<P, E>
  & SharedFlexboxContainerProps;

/**
 * Generate a Type dedicated to Flexbox Content Element
 */
export type FlexboxContent<P, E extends keyof JSX.IntrinsicElements = 'div'> =
  AppBucketsComponentProps<P, E>
  & SharedFlexboxContentProps;

/**
 * An interface with Structural AppBuckets Props
 */
export interface CoreAppBucketsComponentProps {
  /** An Element used to Render the Component */
  as?: ElementType;

  /** Main Component Content */
  children?: ReactNode;

  /** User Defined Class Names */
  className?: string;

  /** Content Shorthand */
  content?: ShorthandContent;
}


/**
 * Shared Component props to define style
 */
export interface SharedAppBucketsComponentProps {
  /** Choose Main background Color */
  backgroundColor?: AppBucketsColor;

  /** Set element display */
  display?: ResponsiveProps<ElementDisplay>;

  /** Define the main Font Weight */
  fontWeight?: FontWeight;

  /** Change component size */
  size?: ElementSize;

  /** Define Text Align */
  textAlign?: ContentAlign;

  /** Choose main text color */
  textColor?: AppBucketsColor;
}


/**
 * Define an interface with the state
 * element color
 */
export interface SharedComponentStateProps {
  /** Manually set the Element appearance by Color Pool */
  appearance?: AppBucketsColor;

  /** Set the Danger State */
  danger?: boolean;

  /** Set the Info State */
  info?: boolean;

  /** Set the Primary State */
  primary?: boolean;

  /** Set the Secondary State */
  secondary?: boolean;

  /** Set the Success State */
  success?: boolean;

  /** Set the Warning State */
  warning?: boolean;
}


/**
 * Generate a Type to extends Component Props
 * with useful Flexbox container props
 */
export interface SharedFlexboxContainerProps {
  /** Set content horizontal disposition */
  columnsAlign?: ResponsiveProps<FlexContentHorizontalAlign>;

  /** Set content vertical disposition */
  verticalAlign?: ResponsiveProps<FlexContentVerticalAlign>;

  /** Set if must avoid gutter between columns */
  withoutGap?: ResponsiveProps<boolean>;
}


/**
 * Generate a Type to extends Component Props
 * with useful Flexbox content props
 */
export interface SharedFlexboxContentProps {
  /** Set the base Content Width */
  width?: ResponsiveContentWidth;

  /** Set the Content Offset */
  offsetBy?: ResponsiveContentOffset;

  /** Set the Content Vertical disposition */
  verticalAlign?: ResponsiveProps<FlexContentVerticalAlign>;
}


/* --------
 * Handlers Type
 * -------- */
export type ChangeHandler<H, P> = (e: ChangeEvent<H>, props: P) => void;

export type FocusHandler<H, P> = (e: FocusEvent<H>, props: P) => void;

export type ClickHandler<H, P> = (e: MouseEvent<H>, props: P) => void;


/* --------
 * Alignment Types
 * -------- */
export type ContentAlign = 'left' | 'center' | 'right';
export type FontWeight = 'light' | 'regular' | 'semi bold' | 'bold';
export type VerticalAlign = 'on top' | 'on bottom' | 'center';


/* --------
 * Size Types
 * -------- */
export type ElementDisplay =
  'block'
  | 'grid'
  | 'inline block'
  | 'inline flex'
  | 'inline'
  | 'flex'
  | 'table'
  | 'table column group'
  | 'table header group'
  | 'table footer group'
  | 'table row group'
  | 'table cell'
  | 'table column'
  | 'table row'
  | 'none';
export type ElementSize = 'extra small' | 'small' | 'normal' | 'large' | 'big' | 'huge';
export type Spacer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type ShadowElevation =
  0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';


/* --------
 * Flexbox Grid Types
 * -------- */
export type FlexContentVerticalAlign = VerticalAlign | 'stretched';
export type FlexContentHorizontalAlign = 'on start' | 'centered' | 'on end' | 'spaced between' | 'spaced around';
export type FlexContentOffset =
  1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23';
export type FlexContentWidth = FlexContentOffset | 24 | '24' | 'auto';


/* --------
 * Responsive Properties
 * -------- */
export interface ResponsiveValue<T> {
  /** Set value on phone up screen */
  phoneUp?: T;

  /** Set value on table up screen */
  tabletUp?: T;

  /** Set value on desktop up screen */
  desktopUp?: T;

  /** Set value on large desktop up screen */
  largeDesktopUp?: T;
}

export type ResponsiveProps<T> = T | ResponsiveValue<T>;

export type ResponsiveContentWidth = ResponsiveProps<FlexContentWidth>;
export type ResponsiveContentOffset = ResponsiveProps<FlexContentOffset>;


/* --------
 * Colors Type
 * -------- */
export type BrandColor = 'primary' | 'danger' | 'warning' | 'success' | 'info';

export type UIColor =
  | 'text'
  | 'text secondary'
  | 'black'
  | 'white'
  | 'white shade'
  | 'blue'
  | 'teal'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'cloud light'
  | 'cloud'
  | 'cloud dark';

export type AppBucketsColor = BrandColor | UIColor;
