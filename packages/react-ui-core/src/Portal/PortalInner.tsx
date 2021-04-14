import * as React from 'react';
import { createPortal } from 'react-dom';

import Ref from '../Ref';

import { PortalInnerProps } from './PortalInner.types';


const PortalInner: React.FunctionComponent<PortalInnerProps> = (props) => {

  const {
    children,
    innerRef,
    mountNode,
    onMount  : userDefinedOnMountHandler,
    onUnmount: userDefinedOnUnmountHandler
  } = props;


  // ----
  // Call Lifecycle Event
  // ----
  React.useEffect(
    () => {
      /** Call onMount */
      if (typeof userDefinedOnMountHandler === 'function') {
        userDefinedOnMountHandler();
      }

      /** Call onUnmount */
      return () => {
        if (typeof userDefinedOnUnmountHandler === 'function') {
          userDefinedOnUnmountHandler();
        }
      };
    },
    // This hook is limited to be used as an internal handler
    // to fire onMount / onUnmount handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  return createPortal(
    <Ref innerRef={innerRef}>
      {children}
    </Ref>,
    mountNode || document.body
  );
};

PortalInner.displayName = 'PortalInner';

export default PortalInner;
