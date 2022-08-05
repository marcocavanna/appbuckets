import * as React from 'react';
import clsx from 'clsx';

import { useWithDefaultProps } from '../BucketTheme';

import { useSharedClassName } from '../utils';

import { FormProps } from './Form.types';


/* --------
 * Component Render
 * -------- */
const Form: React.FunctionComponent<FormProps> = React.forwardRef<HTMLFormElement, FormProps>((
  receivedProps,
  ref
) => {

  const props = useWithDefaultProps('form', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      onSubmit,
      ...rest
    }
  } = useSharedClassName(props);

  /** Build the element class list */
  const classes = clsx(
    { disabled },
    'form',
    className
  );


  /* --------
   * Form Submit Handler
   * -------- */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /** Prevent any default action, only if action props is not defined */
    if (typeof props.action !== 'string') {
      e.preventDefault();
    }

    /** Disabled Form couldn't be submitted */
    if (disabled) {
      return;
    }

    /** Call the user defined onSubmit handler */
    if (typeof onSubmit === 'function') {
      onSubmit(e, props);
    }
  };


  /* --------
   * Render the Form
   * -------- */
  return (
    <form {...rest} ref={ref} className={classes} onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
});

Form.displayName = 'Form';

export default Form;
