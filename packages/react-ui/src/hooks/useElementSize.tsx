import * as React from 'react';
import { useWindowResize } from './useWindowResize';

/* --------
 * Hook Configuration
 * -------- */
interface UseElementSize {
  /** Set if hook is disabled */
  disabled?: boolean;

  /** Set a fixed height to use */
  fixedHeight?: number;

  /** Set a fixed width to use */
  fixedWidth?: number;

  /** Set the maximum height */
  maximumHeight?: number;

  /** Set the maximum width */
  maximumWidth?: number;

  /** Set the minimum height */
  minimumHeight?: number;

  /** Set the minimum width */
  minimumWidth?: number;

  /** Set if must subtract some pixel from height */
  subtractToHeight?: number;

  /** Set if must subtract some pixel from width */
  subtractToWidth?: number;

  /** Use height detected size without compute dimension using top position and window size */
  useDetectorHeightOnly?: boolean;

  /** Use width detected size without compute dimension using left position and window size */
  useDetectorWidthOnly?: boolean;
}


/* --------
 * Internal Useful
 * -------- */
function computeDimension(initial: number, subtracts?: number, minimum?: number, maximum?: number): number {
  /** Subtract */
  const dimension = initial - (subtracts || 0);

  if (dimension < (minimum || 0)) {
    return minimum || 0;
  }

  if (typeof maximum === 'number' && dimension > maximum) {
    return maximum;
  }

  return dimension;
}


/* --------
 * Hook Definition
 * -------- */
export function useElementSize(
  config: UseElementSize
): readonly [ React.ReactElement<HTMLDivElement>, { width: number, height: number } ] {

  const {
    disabled,
    fixedHeight,
    fixedWidth,
    maximumHeight,
    maximumWidth,
    minimumHeight,
    minimumWidth,
    subtractToHeight,
    subtractToWidth,
    useDetectorHeightOnly,
    useDetectorWidthOnly
  } = config;


  // ----
  // Create the Unique DetectorID
  // ----
  const [ widthDetectorID ] = React.useState(`__rx-width-detector-${Math.round(Math.random() * 1000)}`);


  // ----
  // Internal State
  // ----
  const [ size, setElementSize ] = React.useState({
    width : fixedWidth || 0,
    height: fixedHeight || 0
  });


  // ----
  // Initialize the detector ref
  // ----
  const elementRef = React.useRef<HTMLDivElement>(null);


  // ----
  // Memoize the Handle to call On Window Resize Event
  // ----
  const handleWindowResize = React.useCallback(
    () => {
      /** If no ref, or component is not mount, return */
      if (!elementRef.current || !elementRef.current.parentNode) {
        return;
      }

      const { current: detector } = elementRef;

      /** Get current window height and width */
      const {
        innerHeight: windowHeight,
        innerWidth : windowWidth
      } = window;

      /** Get the element top and left position */
      const {
        top : detectorTopPosition,
        left: detectorLeftPosition
      } = detector.getBoundingClientRect();

      /** Get new Sizing */
      const nextHeight = typeof fixedHeight !== 'number' ? computeDimension(
        useDetectorHeightOnly ? detector.clientHeight : (windowHeight - detectorTopPosition),
        subtractToHeight,
        minimumHeight,
        maximumHeight
      ) : fixedHeight;

      const nextWidth = typeof fixedWidth !== 'number' ? computeDimension(
        useDetectorWidthOnly ? detector.clientWidth : (windowWidth - detectorLeftPosition),
        subtractToWidth,
        minimumWidth,
        maximumWidth
      ) : fixedWidth;

      /** Check if state must be updated */
      if ((nextHeight !== size.height) || (nextWidth !== size.width)) {
        setElementSize({
          height: nextHeight,
          width : nextWidth
        });
      }
    },
    [
      useDetectorHeightOnly,
      useDetectorWidthOnly,
      fixedHeight,
      fixedWidth,
      maximumHeight,
      maximumWidth,
      minimumHeight,
      minimumWidth,
      size.height,
      size.width,
      subtractToHeight,
      subtractToWidth
    ]
  );


  // ----
  // Memoize the Width Detector Element
  // ----
  const widthDetector = React.useMemo(
    () => (
      <div
        ref={elementRef}
        id={widthDetectorID}
        style={{
          visibility: 'hidden',
          opacity   : 0
        }}
      />
    ),
    [ widthDetectorID ]
  );


  // ----
  // Active the Window Resize Hook
  // ----
  useWindowResize({
    disabled: disabled || !elementRef.current || !!(fixedWidth && fixedHeight),
    onResize: handleWindowResize
  });


  // ----
  // Return Data
  // ----
  return [ widthDetector, size ] as const;
}
