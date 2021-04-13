import * as React from 'react';


/* --------
 * Hook Configuration
 * -------- */
interface UseWindowResizeConfig {
  /** Set if hook is disabled */
  disabled?: boolean;

  /** The handler to execute when window resize event is fired */
  onResize?: (size: { width: number, height: number }) => void;
}


/* --------
 * Hook Definition
 * -------- */
export function useWindowResize(config: UseWindowResizeConfig) {

  const {
    disabled,
    onResize
  } = config;

  // ----
  // Hook is limited to a useEffect with event listener attached
  // ----
  React.useEffect(
    () => {
      /** If hook has been disabled, return a noop */
      if (disabled) {
        return () => null;
      }

      /** Build a well know function to be removed on effect clear */
      function handleWindowResize() {
        if (typeof onResize === 'function') {
          onResize({ height: window.innerHeight, width: window.innerWidth });
        }
      }

      /** Attach the event */
      window.addEventListener('resize', handleWindowResize);

      /** Call the handler once to simulate first load */
      handleWindowResize();

      /** Return a function to clear event */
      return () => window.removeEventListener('resize', handleWindowResize);
    },
    [ disabled, onResize ]
  );
}
