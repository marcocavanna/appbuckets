import * as React from 'react';


export default function useMountedState<S>(initialState: S | (() => S)): [ S, React.Dispatch<React.SetStateAction<S>> ] {
  /** Init the state */
  const [ state, setStateBase ] = React.useState<S>(initialState);

  /** Init a ref to check if component is mounted or not */
  const isMounted = React.useRef<boolean>(false);

  /** Change isMounted value on component mount/unmount */
  React.useEffect(
    () => {
      isMounted.current = true;

      return () => {
        isMounted.current = false;
      };
    },
    []
  );

  /** Create a wrap to setState function */
  const setState: React.Dispatch<React.SetStateAction<S>> = React.useCallback(
    (newState) => {
      /** Assert component is mount */
      if (isMounted.current) {
        setStateBase(newState);
      }
    },
    []
  );

  /** Return state and wrapped function */
  return [ state, setState ];
}
