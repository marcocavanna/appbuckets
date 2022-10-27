import * as React from 'react';


/**
 * An augmented version of the useRef function.
 * It will return a 'ref' style object with the
 * current key memoized, returning each time
 * the most updated version of the value
 *
 * @param value The value to store into ref object
 */
export function useSyncedRef<T>(value: T): { readonly current: T } {
  const ref = React.useRef(value);

  ref.current = value;

  return React.useMemo(
    () =>
      Object.freeze({
        get current() {
          return ref.current;
        }
      }),
    []
  );
}
