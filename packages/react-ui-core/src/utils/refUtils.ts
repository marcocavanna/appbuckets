import * as React from 'react';
import invariant from 'tiny-invariant';


/**
 * A function to correctly handles passing refs.
 *
 * @param ref The ref Object or Function
 * @param node The node that should by passed by ref
 */
export function handleRef<E>(ref: React.Ref<E> | undefined, node: E) {

  // Check Ref is not a deprecated string
  // This check is necessary for JavaScript only usage
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      typeof (ref as unknown as string) !== 'string',
      [
        'String ref are not supported anymore. This is a Legacy API and will be likely to be removed',
        'in one of the future release of React'
      ].join(' ')
    );
  }

  if (typeof ref === 'function') {
    ref(node);
    return;
  }

  if (ref !== null && typeof ref === 'object') {
    // The current property is defined as readonly
    // but this ia valid way to assign ref, because is a mutable object
    (ref as React.MutableRefObject<E>).current = node;
  }

}


const refObjectsStore = new WeakMap<any>();
const nullRefObject: React.Ref<null> = { current: null };

export function toRefObject<E extends HTMLElement>(node: E | null) {
  // If no node is passed, return null ref
  if (node === null) {
    return nullRefObject;
  }

  // If node has been previously stored, get cached
  if (refObjectsStore.has(node)) {
    return refObjectsStore.get(node);
  }

  // Cache the ref
  const refObject = { current: node };
  refObjectsStore.set(node, refObject);

  return refObject;
}


/**
 * Check if a thing is a valid React Ref Object
 *
 * @param ref Thing to Check
 */
export function isRefObject<E = HTMLElement>(ref: any): ref is React.RefObject<E> {
  return ref !== null && typeof ref === 'object'
    && Object.prototype.hasOwnProperty.call(ref, 'current');
}
