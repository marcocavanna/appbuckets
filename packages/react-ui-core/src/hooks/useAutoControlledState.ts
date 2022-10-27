import * as React from 'react';

import { useEnhancedEffect } from './useEnhancedEffect';
import { useSafeState } from './useSafeState';


/* --------
 * Internal Types
 * -------- */
interface UseAutoControlledStateOptions<S> {
  /** The default value to set at the first time */
  defaultValue?: S;

  /**
   * The value to set and update every time it changes.
   * If it has been set, then the state will be controlled
   * externally and the trySet function won't have any effect
   */
  value?: S;
}

type UseAutoControlledStateResult<S> = Readonly<[
  /** Current value */
  S,
  /** Function to try to change the value */
  React.Dispatch<React.SetStateAction<S>>,
  /** A function that will force the state change */
  React.Dispatch<React.SetStateAction<S>>
]>;


/* --------
 * Hook Function
 * -------- */

/**
 * Augmented useState with AutoControlled option.
 * Use this hook if the controlling of this state
 * will be optionally demanded externally and
 * potentially controlled by a prop or an arbitrary value
 *
 * @param initialState The initial state of the AutoControlled State
 * @param options Options to pass controlled value and default value
 */
export function useAutoControlledState<S>(
  initialState: S | (() => S),
  options?: UseAutoControlledStateOptions<S>
): UseAutoControlledStateResult<S> {


  /**
   * Get the user defined options to check if
   * the state will be auto controlled or
   * controlled externally by user
   */
  const { value, defaultValue } = options || {};


  /**
   * To avoid the useCallback change every time
   * the value change, and let invalidate the
   * other hooks depending on it, save the
   * AutoControlled state into an internal ref
   */
  const isAutoControlled = React.useRef<boolean>(value === undefined);


  /**
   * Update the isAutoControlled value any time the
   * value will change
   */
  useEnhancedEffect(
    () => {
      isAutoControlled.current = value === undefined;
    },
    [ value ]
  );


  /**
   * As this hook will be principally used on component
   * with value (like input, checkbox) or in component
   * with an external controllable state (like modal)
   * use the SafeState hook to avoid state change when
   * component is unmounted
   */
  const [ state, setState ] = useSafeState<S>(
    () => {
      /** Get initial value from user props */
      const initialProp = value === undefined ? defaultValue : undefined;

      /** If initialProps is undefined, could return it */
      if (initialProp !== undefined) {
        return initialProp;
      }

      /** Else, return the initialState provided within the function */
      return typeof initialState === 'function'
        ? (initialState as () => S)()
        : initialState;
    }
  );


  /**
   * Create a new function that could be used to attempt to modify
   * the state object, only if the state is not being controlled
   * by the external property
   */
  const trySetState: React.Dispatch<React.SetStateAction<S>> = React.useCallback(
    (newState) => {
      /** Update the state only if current prop is not  */
      if (isAutoControlled.current) {
        setState(newState);
      }
    },
    [ setState ]
  );


  /** Return the Hook Result with state and utilities */
  return [
    value === undefined ? state : value,
    trySetState,
    setState
  ] as const;

}
