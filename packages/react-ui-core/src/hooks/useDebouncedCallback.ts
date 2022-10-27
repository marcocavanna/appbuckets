import * as React from 'react';

import { useSyncedRef } from './useSyncedRef';
import { useUnmountEffect } from './useUnmountEffect';


/* --------
 * Internal Types
 * -------- */
interface DebouncedFunction<Fn extends (...args: any[]) => any> {
  (this: null, ...args: Parameters<Fn>): void;
}


/**
 * Return a wrapped Debounced variant function of the
 * provided function.
 * The returned function call will be delayed by interval param
 * if a next invoke will be requested
 *
 * @param callback The function to call
 * @param deps Array dependencies list
 * @param interval The interval time
 */
export function useDebouncedCallback<Fn extends (...args: any[]) => any>(
  callback: Fn,
  deps: React.DependencyList,
  interval: number
): DebouncedFunction<Fn> {

  /** Prepare the timeout ref */
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  const debounceCallback = useSyncedRef(callback);

  /** Set up a function that could be used to clear timeout */
  const clearTimeoutRef = React.useCallback(
    () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = undefined;
      }
    },
    []
  );

  /** Cleanup the timeout on unmount */
  useUnmountEffect(() => {
    clearTimeoutRef();
  });

  /** Return a new wrapped function that will set up the timeout on call */
  return React.useCallback(
    (...args) => {
      /** If the timeout already exists, clear it */
      clearTimeoutRef();

      /** Set a new timeout to wait for function call */
      timeout.current = setTimeout(() => {
        debounceCallback.current(...args);
      }, interval);
    },
    [ clearTimeoutRef, interval, debounceCallback ]
  );

}
