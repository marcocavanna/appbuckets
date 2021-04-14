import * as React from 'react';


/* --------
 * Hooks Config
 * -------- */
interface UseDOMElementEvent {
  /** Callback to fire */
  callback: (event: Event) => void;

  /** Set if hook is disabled */
  disabled?: boolean;

  /** Event to use */
  event: keyof HTMLElementEventMap;

  /** The target to attach event */
  target?: HTMLElement;
}


/* --------
 * Hook Definition
 * -------- */
export default function useDOMElementEvent(config: UseDOMElementEvent) {

  const {
    callback,
    disabled,
    event,
    target
  } = config;

  // ----
  // Hook is limited to a useEffect with event listener attached
  // ----
  React.useEffect(
    () => {
      /** If hook is disabled return */
      if (disabled) {
        return;
      }

      const elementTarget = target || document.documentElement;

      /** Attach the event */
      elementTarget.addEventListener(event, callback);

      /** On component unmount, detach the event */
      return () => elementTarget.removeEventListener(event, callback);
    },
    [ disabled, event, target, callback ]
  );
}
