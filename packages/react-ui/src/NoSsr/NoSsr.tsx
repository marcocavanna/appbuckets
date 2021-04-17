import * as React from 'react';

import { useEnhancedEffect } from '../hooks/useEnhancedEffect';

import { NoSsrProps } from './NoSsr.types';


const NoSsr: React.FunctionComponent<NoSsrProps> = (props) => {

  const { children, fallback } = props;

  // ----
  // Mounted State Management
  // ----
  const [ mounted, setMounted ] = React.useState(false);

  useEnhancedEffect(
    () => {
      setMounted(true);
    },
    []
  );


  // ----
  // Component Render
  // ----
  return (
    <React.Fragment>
      {mounted ? children : fallback}
    </React.Fragment>
  );
};

NoSsr.displayName = 'NoSsr';

export default NoSsr;
