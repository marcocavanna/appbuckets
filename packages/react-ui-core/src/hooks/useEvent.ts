import { useEnhancedEffect } from './useEnhancedEffect';
import { useSyncedRef } from './useSyncedRef';


/* --------
 * Internal Types
 * -------- */
interface UseEventOptions {
  /** Set the event fire as disabled without unloading the hook */
  disabled?: boolean;

  /** Change the event target, default to main document element */
  target?: HTMLElement;
}

type EventCallback<K extends keyof HTMLElementEventMap> = (this: HTMLElement, event: HTMLElementEventMap[K]) => void;


/**
 * Attach a HTMLElement lister to a target DOM Element.
 *
 * @param name The event to listen to
 * @param callback The callback function to call
 * @param options Some options to customize the hook
 */
export function useEvent<K extends keyof HTMLElementEventMap>(
  name: K,
  callback: EventCallback<K>,
  options?: UseEventOptions
) {

  /** Get options and set defaults */
  const {
    disabled = false,
    target = document.documentElement
  } = options || {};


  /**
   * Every time the hook will be called update the handler
   * function in the ref object.
   * This logic will help the event listener to get always the last
   * version update of the handler, without have to need to save it
   * into react use effect dependencies
   */
  const handler = useSyncedRef<EventCallback<K>>(callback);


  useEnhancedEffect(
    () => {
      /** If hook has been disabled, avoid the event listen */
      if (disabled) {
        return;
      }

      /**
       * Wrap the handler function into a local scoped function to be removed
       * once the effect will be cleared.
       * HEADS UP, using the useRef method to save the handler, the function
       * could not be the same reference of when the component mount
       */
      const eventCallback: EventCallback<K> = (event) => (
        handler.current.apply(target, [ event ])
      );

      /** Attach the event listener to the DOM target */
      target.addEventListener(name, eventCallback);

      /** On effect clear, remove the event attached to target */
      return () => {
        target.removeEventListener(name, eventCallback);
      };
    },
    [ disabled, name, target, handler ]
  );

}
