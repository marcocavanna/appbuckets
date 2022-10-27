import * as React from 'react';

import { useEnhancedEffect } from './useEnhancedEffect';


/**
 * Hook that could be used to wrap the original
 * setState hook function to be called and to change
 * state only if using component is mounted
 *
 * @param initialState Initial state to use
 */
export function useSafeState<S>(
  initialState: S | (() => S)
): [ S, React.Dispatch<React.SetStateAction<S>> ] {

  /** Init internal state using default React hook */
  const [ state, setState ] = React.useState<S>(initialState);

  /** Use a ref hook to check component mount */
  const isMounted = React.useRef<boolean>(false);

  /** Update the ref on component mount/unmount */
  useEnhancedEffect(
    () => {
      isMounted.current = true;

      return () => {
        isMounted.current = false;
      };
    },
    []
  );

  /** Wrap original setState action to consider mounted state */
  const wrappedSeState = React.useCallback<React.Dispatch<React.SetStateAction<S>>>(
    (newState) => {
      if (isMounted.current) {
        setState(newState);
      }
    },
    []
  );

  /** Return state and wrapped set state */
  return [ state, wrappedSeState ];

}
