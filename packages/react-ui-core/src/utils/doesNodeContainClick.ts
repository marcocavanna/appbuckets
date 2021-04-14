import * as React from 'react';

import { inRange, invoke, isNil, some } from 'lodash';


export function doesNodeContainClick(
  node: HTMLElement,
  e: React.MouseEvent<HTMLElement> | MouseEvent
): boolean {
  // Check all params are valid
  if (some([ node, e ], isNil)) {
    return false;
  }

  // if there is an e.target and it is in the document, use a simple node.contains() check
  if (e.target) {
    // Set a custom attribute that will be checked later using a selector
    invoke(e.target, 'setAttribute', 'data-bucket-click-target', true);

    // Check if the selector exists in document
    if (document.querySelector('[data-bucket-click-target=true]')) {
      invoke(e.target, 'removeAttribute', 'data-bucket-click-target');
      return node.contains(e.target as Node);
    }
  }

  // Below logic handles cases where the e.target is no longer in the document.
  // The result of the click likely has removed the e.target node.
  // Instead of node.contains(), we'll identify the click by X/Y position.

  // return early if the event properties aren't available
  // prevent measuring the node and repainting if we don't need to
  const { clientX, clientY } = e;
  if (some([ clientX, clientY ], isNil)) {
    return false;
  }

  // false if the node is not visible
  const clientRects = node.getClientRects();

  // getClientRects returns a DOMRectList, not an array nor a plain object
  // We explicitly avoid _.isEmpty and check .length to cover all possible shapes
  if (!node.offsetWidth || !node.offsetHeight || !clientRects || !clientRects.length) {
    return false;
  }

  // false if the node doesn't have a valid bounding rect
  const { top, bottom, left, right } = clientRects[0];
  if (some([ top, bottom, left, right ], isNil)) {
    return false;
  }

  // we add a small decimal to the upper bound just to make it inclusive
  // don't add an whole pixel (1) as the event/node values may be decimal sensitive
  return inRange(clientY, top, bottom + 0.001) && inRange(clientX, left, right + 0.001);

}
