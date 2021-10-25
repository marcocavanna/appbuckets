import * as React from 'react';

import type { UseSmartComponentsResult } from './SmartComponentsProvider.types';


/** Create the base context */
const SmartComponentsContext = React.createContext<UseSmartComponentsResult | undefined>(undefined);

/** Create the Hook */
const useSmartComponents: () => UseSmartComponentsResult | undefined = () => (
  React.useContext(SmartComponentsContext)
);

/** Export a Context Provider Shorthand */
const SmartComponentsProvider: React.FunctionComponent<UseSmartComponentsResult> = (props) => {
  /** Keep Props for Building Context Provider */
  const {
    children,
    ...smartComponentProps
  } = props;

  /** Return the Provider */
  return (
    <SmartComponentsContext.Provider value={smartComponentProps}>
      {children}
    </SmartComponentsContext.Provider>
  );
};

SmartComponentsProvider.displayName = 'SmartComponentsProvider';

export { SmartComponentsProvider };

export { useSmartComponents };
