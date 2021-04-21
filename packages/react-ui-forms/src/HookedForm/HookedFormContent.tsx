import * as React from 'react';

import { useHookedFormContext } from '../context';


/* --------
 * Component Definition
 * -------- */
const HookedFormContent: React.FunctionComponent = (props) => {

  const { children } = props;

  /** Get the Wrapper Component */
  const {
    contentWrapper: Wrapper
  } = useHookedFormContext();

  /** No Wrapper, no Party */
  if (!Wrapper) {
    return null;
  }

  /** Omit props on React.Fragment, they are not allowed */
  const wrapperProps = Wrapper === React.Fragment
    ? undefined
    : { className: 'form-content' };

  /** Return the Component */
  return (
    <Wrapper {...wrapperProps}>
      {children}
    </Wrapper>
  );
};

HookedFormContent.displayName = 'HookedFormContent';

export default HookedFormContent;
