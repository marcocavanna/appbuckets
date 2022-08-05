import * as React from 'react';
import clsx from 'clsx';

import {
  ShorthandCollection,
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { ButtonGroupProps } from './ButtonGroup.types';

import { ButtonProps } from './Button.types';

import type ButtonComponent from './Button';


/* --------
 * Import ButtonGroup async to avoid circular dependencies
 * -------- */
let Button: typeof ButtonComponent | null = null;

import('./Button').then(({ default: buttonComponent }) => {
  Button = buttonComponent;
});


/* --------
 * Component Render
 * -------- */
const ButtonGroup: Creatable<React.FunctionComponent<ButtonGroupProps>> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('buttonGroup', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      buttons,
      full,
      vertical,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the Element Type */
  const ElementType = useElementType(ButtonGroup, receivedProps, props);

  /** Build Component Classes */
  const classes = clsx(
    { full, vertical },
    'buttons',
    className
  );

  /** If children are defined return the element */
  const hasChildren = !childrenUtils.isNil(children);
  if (hasChildren || content) {
    return (
      <ElementType {...rest} className={classes}>
        {!hasChildren ? content : children}
      </ElementType>
    );
  }

  /** Generate Buttons */
  const buttonsElement = Array.isArray(buttons)
    ? buttons.map((buttonProps) => Button && Button.create(buttonProps, { autoGenerateKey: true }))
    : [];

  /** Return the Group */
  return (
    <ElementType {...rest} className={classes}>
      {buttonsElement}
    </ElementType>
  );
};

/** Properly Set displayName */
ButtonGroup.displayName = 'ButtonGroup';

/** Implements the Create Factory Method */
ButtonGroup.create = createShorthandFactory(
  ButtonGroup,
  (buttons) => ({
    buttons: buttons as ShorthandCollection<ButtonProps>
  })
);

export default ButtonGroup;
