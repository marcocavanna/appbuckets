/**
 * Return true/false depending on the client
 * that is executing the source javascript code
 */
export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined';
