import * as React from 'react';

import Button from '@appbuckets/react-ui/Button';

import { useHookedFormContext } from '../context';


/* --------
 * Component Definition
 * -------- */
const HookedFormActions: React.VFC = () => {

  /** Get the Wrapper Component */
  const {
    actionsWrapper: Wrapper,
    cancelButton,
    formState,
    handleCancel,
    submitButton
  } = useHookedFormContext();

  /** No Wrapper, no Party */
  if (!Wrapper) {
    return null;
  }

  /** Omit props on React.Fragment, they are not allowed */
  const wrapperProps = Wrapper === React.Fragment
    ? undefined
    : { className: 'form-actions' };

  /** Build elements using Shorthand */
  const cancelButtonElement = Button.create(cancelButton, {
    autoGenerateKey: false,
    defaultProps   : {
      className: 'cancel'
    },
    overrideProps  : (originalProps) => ({
      disabled: formState.isSubmitting,
      onClick : (event, buttonProps) => {
        /** Use user defined onClick handler if exists */
        if (typeof originalProps.onClick === 'function') {
          originalProps.onClick(event, buttonProps);
        }
        /** Call internal Handler */
        handleCancel();
      }
    })
  });

  const submitButtonElement = Button.create(submitButton, {
    autoGenerateKey: false,
    defaultProps   : {
      className: 'submit',
      primary  : true,
      loading  : formState.isSubmitting
    },
    overrideProps  : {
      disabled: formState.isSubmitting,
      type    : 'submit'
    }
  });

  /** Return the Component */
  return (
    <Wrapper {...wrapperProps}>
      {cancelButtonElement}
      {submitButtonElement}
    </Wrapper>
  );
};

HookedFormActions.displayName = 'HookedFormActions';

export default HookedFormActions;
