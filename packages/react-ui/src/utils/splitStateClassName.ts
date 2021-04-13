import clsx from 'clsx';

import {
  classByKey,
  classByPattern
} from '@appbuckets/react-ui-core';

import {
  SharedComponentStateProps
} from '../generic';


export type SplitStateClassName<P> = [
  string,
  {
    [K in keyof P]: K extends keyof SharedComponentStateProps ? never : P[K]
  },
  SharedComponentStateProps
];


export default function splitStateClassName<P extends SharedComponentStateProps>(props: P): SplitStateClassName<P> {

  const {
    appearance,
    danger,
    info,
    primary,
    secondary,
    success,
    warning,
    ...rest
  } = props as P & SharedComponentStateProps;

  const classes = clsx(
    classByKey(danger, 'is-danger'),
    classByKey(info, 'is-info'),
    classByKey(primary, 'is-primary'),
    classByKey(secondary, 'is-secondary'),
    classByKey(success, 'is-success'),
    classByKey(warning, 'is-warning'),
    /** Apply manual color only if any other shorthand is falsy */
    classByPattern(
      (!danger && !info && !primary && !secondary && !success && !warning && appearance),
      'is-%value%'
    )
  );

  return [
    classes,
    rest,
    {
      appearance,
      danger,
      info,
      primary,
      secondary,
      success,
      warning
    }
  ] as unknown as SplitStateClassName<P>;

}
