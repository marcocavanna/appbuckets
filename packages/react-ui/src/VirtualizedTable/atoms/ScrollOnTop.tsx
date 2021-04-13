import * as React from 'react';
import clsx from 'clsx';

import Button from '../../Button';
import type { ButtonProps } from '../../Button';


/* --------
 * Component Interfaces
 * -------- */
export interface ScrollOnTopProps extends ButtonProps {
  /** Set if is Visible */
  visible?: boolean;
}


/* --------
 * Component Definition
 * -------- */
const ScrollOnTop: React.FunctionComponent<ScrollOnTopProps> = (props) => {

  /** Extract visible key */
  const {
    visible,
    ...rest
  } = props;

  /** Build button classes */
  const classes = clsx({ visible }, 'scroll-on-top');

  /** Render the Component */
  return (
    <Button
      primary
      fab
      size={'normal'}
      icon={{ name: 'angle-up', size: 'large' }}
      tooltip={'Top'}
      {...rest}
      className={classes}
    />
  );
};

ScrollOnTop.displayName = 'ScrollOnTop';

export default ScrollOnTop;
