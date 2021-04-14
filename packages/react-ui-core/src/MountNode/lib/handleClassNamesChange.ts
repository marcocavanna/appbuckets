import * as React from 'react';

import {
  difference,
  forEach,
  isNil
} from 'lodash';

import {
  flow,
  toArray,
  map,
  flatMap,
  split,
  filter,
  identity,
  uniq
} from 'lodash/fp';


const computeClassNames: ((component: Set<React.Component>) => string[]) = flow(
  toArray,
  map('props.className'),
  flatMap(split(/\s+/)),
  filter(identity),
  uniq
);

const computeClassNameDifference = (
  prev: string[] | undefined,
  curr: string[] | undefined
): [ string[], string[] ] => [
  difference(curr, prev ?? []),
  difference(prev, curr ?? [])
];

const prevClassName = new Map<React.RefObject<HTMLElement>, string[]>();

export default function handleClassNamesChange<E extends HTMLElement>(
  ref: React.RefObject<E> | null,
  components: Set<React.Component> | undefined
): void {
  if (isNil(ref) || isNil(components)) {
    return;
  }

  const currentClassNames = computeClassNames(components);
  const [ toAdd, toRemove ] = computeClassNameDifference(
    prevClassName.get(ref),
    currentClassNames
  );

  if (ref.current !== null) {
    forEach(toAdd, className => ref.current?.classList.add(className));
    forEach(toRemove, className => ref.current?.classList.remove(className));
  }

  prevClassName.set(ref, currentClassNames);
}
