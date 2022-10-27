import { useEnhancedEffect } from './useEnhancedEffect';
import { useSyncedRef } from './useSyncedRef';


/**
 * Use this hook to call the provided
 * callable function to be called once the
 * component will unmount
 *
 * @param callback Function to be called
 */
export function useUnmountEffect(
  callback: CallableFunction
): void {

  /** Save the callback function into an immutable object */
  const unmountCallback = useSyncedRef(callback);

  /** Attach an event to call function on unmount */
  useEnhancedEffect(
    () => () => {
      unmountCallback.current();
    },
    [ unmountCallback ]
  );

}
