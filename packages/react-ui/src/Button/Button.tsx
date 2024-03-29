import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useRipples } from '../hooks/useRipples';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { ButtonProps } from './Button.types';
import ButtonGroup from './ButtonGroup';

import Icon from '../Icon';
import Popup from '../Popup';


/* --------
 * Component Declaration
 * -------- */
type ButtonChildren = {
  Group: typeof ButtonGroup;
};


/* --------
 * Component Render
 * -------- */
const Button: Creatable<React.FunctionComponent<ButtonProps>> & ButtonChildren = (
  receivedProps
) => {

  /** Get component props */
  const props = useWithDefaultProps('button', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      active,
      disabled,
      disableRipple,
      fab,
      fitted,
      flat,
      full,
      icon,
      iconPosition,
      inverted,
      loading,
      onClick,
      role,
      rounded,
      tabIndex: userDefinedTabIndex,
      toggle,
      tooltip,
      type,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Button, receivedProps, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Using ripple */
  const [ showRipple, buttonRipples ] = useRipples();


  /**
   * Compute the correct
   * button aria role based on button type
   */
  const ariaRole = React.useMemo<React.AriaRole | undefined>(() => {
    /** If role is defined, return it */
    if (role != null) {
      return role;
    }
    /** If element is a button, return button */
    if ((ElementType as any) === 'button') {
      return 'button';
    }
    /** Else, return null */
    return undefined;
  }, [ role, ElementType ]);


  /**
   * Compute the right tab index using
   * the disabled prop and/or the original
   * tabIndex property defined by user
   */
  const tabIndex = React.useMemo<number | undefined>(() => {
    /** If tabIndex has been defined by user return it */
    if (userDefinedTabIndex != null) {
      return userDefinedTabIndex;
    }
    /** If component is disabled, strict tabIndex to -1 */
    if (disabled) {
      return -1;
    }
    /** If the element has been rendered as a 'div' element, return 0 */
    if (ElementType as any === 'div') {
      return 0;
    }
    /** Fallback to null */
    return undefined;
  }, [ userDefinedTabIndex, disabled, ElementType ]);


  /** Build an handler for click event */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    /** If button is disabled, prevent any click */
    if (disabled) {
      e.preventDefault();
      return;
    }
    /** Show the Ripple if is not disable */
    if (!disableRipple) {
      showRipple(e);
    }
    /** If the onClick function exists, invoke it */
    if (typeof onClick === 'function') {
      /** Stop event Propagation */
      e.stopPropagation();
      onClick(e, props);
    }
  };

  /** Build the element class list */
  const classes = clsx(
    {
      fab        : fab && !content && !children,
      disabled,
      fitted,
      flat,
      inverted,
      loading,
      rounded,
      full,
      active,
      toggle,
      'with-icon': icon && (children || content),
      'as-icon'  : icon && !children && !content
    },
    icon && (children || content) && iconPosition && `icon-on-${iconPosition}`,
    stateClasses,
    'button',
    className
  );

  /** Build the Button Element Props */
  const buttonProps = {
    ...rest,
    type,
    tabIndex,
    className: classes,
    disabled : (disabled && ElementType as any === 'button') || undefined,
    role     : ariaRole,
    onClick  : handleClick
  } as ButtonProps;

  /** If there are children render them */
  if (!childrenUtils.isNil(children)) {
    const buttonElementWithChildren = (
      <ElementType {...buttonProps}>
        {children}
      </ElementType>
    );

    return tooltip
      ? <Popup content={tooltip} trigger={buttonElementWithChildren} />
      : buttonElementWithChildren;
  }

  /** Build the icon if Exists */
  const iconElement = icon && Icon.create(icon, { autoGenerateKey: false });

  /** Else, build the button using shortHand */
  const buttonElement = (
    <ElementType
      {...rest}
      className={classes}
      disabled={(disabled && ElementType as any === 'button') || undefined}
      role={ariaRole}
      type={type}
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      <span>
        {iconPosition === 'left' && iconElement}
        {content}
        {iconPosition === 'right' && iconElement}
      </span>
      {!disableRipple && buttonRipples}
    </ElementType>
  );

  return tooltip
    ? <Popup content={tooltip} trigger={buttonElement} />
    : buttonElement;
};

/** Add the Group */
Button.Group = ButtonGroup;

/** Properly set Display Name */
Button.displayName = 'Button';

/** Create the Shorthand Factory Method */
Button.create = createShorthandFactory(Button, (content) => ({ content }));

export default Button;
