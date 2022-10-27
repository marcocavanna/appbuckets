import * as React from 'react';

import { isBrowser } from '../utils';


/**
 * Return the best way to use the native
 * useEffect React hook, getting the
 * useLayoutEffect if current code is executing
 * on a real browser client
 */
export const useEnhancedEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect;
