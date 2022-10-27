import type * as React from 'react';

import { useEnhancedEffect } from './useEnhancedEffect';
import { useSyncedRef } from './useSyncedRef';


/** The default events name to listen to */
const DEFAULT_EVENTS: ReadonlyArray<keyof HTMLElementEventMap> = [
  'mousedown',
  'touchstart'
];


/**
 * Use this hook to fire an event every time a click occur outside
 * the provided target element
 * @param target
 * @param callback
 * @param events
 */
export function useClickOutside<T extends HTMLElement>(
  target: React.RefObject<T> | React.MutableRefObject<T>,
  callback: EventListener,
  events: ReadonlyArray<keyof HTMLElementEventMap> = DEFAULT_EVENTS
) {

  /** Wrap dependent data into synced ref to maintain immutable */
  const targetElement = useSyncedRef(target);
  const callbackFunction = useSyncedRef(callback);

  /** Use the Enhanced Effect to attach event listeners */
  useEnhancedEffect(
    () => {

      /**
       * Internal function used to check if the event
       * target received from listener it's contained within the
       * requested target element provided within the hook
       *
       * @param event HTML Event received
       */
      function handler(this: HTMLElement, event: Event) {
        /** Assert the target element exists */
        if (!targetElement.current.current) {
          return;
        }

        /** Extract the event target */
        const { target: eventTarget } = event;
        const cb = callbackFunction.current;

        if (
          !eventTarget
          || (!!eventTarget && !targetElement.current.current.contains(eventTarget as Node))) {
          /** Call the callback */
          cb.call(this, event);
        }
      }

      /** Attach the events on all requested key */
      events.forEach((eventName) => {
        /** List for event directly on document element */
        document.addEventListener(eventName, handler, { passive: true });
      });

      /** On effect clear, remove all events */
      return () => {
        events.forEach((eventName) => {
          /** List for event directly on document element */
          document.removeEventListener(eventName, handler);
        });
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ callbackFunction, targetElement, ...events ]
  );

}
