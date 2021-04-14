import * as React from 'react';

import { isNil } from 'lodash';

import { isBrowser } from '../../utils/isBrowser';
import { isRefObject, toRefObject } from '../../utils/refUtils';


type PropsWithNode<E> = React.PropsWithChildren<{ [key: string]: any } & { node?: React.RefObject<E> | E }>;

export default function getNodeRefFromProps<E extends HTMLElement>(props: PropsWithNode<E>): React.RefObject<E> | null {

  const { node } = props;

  if (!isBrowser()) {
    return null;
  }

  if (isRefObject(node)) {
    return node;
  }

  return isNil(node) ? toRefObject(document.body) : toRefObject(node);

}
