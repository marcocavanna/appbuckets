import clsx from 'clsx';

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


function classByPattern(value: any, pattern: string, replacer: string = '%value%'): string | undefined {
  if (typeof value === 'string' || typeof value === 'number') {
    return pattern.replace(new RegExp(replacer, 'g'), value.toString().replace(/\s/g, '-'));
  }

  return undefined;
}


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
    {
      'is-danger'   : danger,
      'is-info'     : info,
      'is-primary'  : primary,
      'is-secondary': secondary,
      'is-success'  : success,
      'is-warning'  : warning
    },
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
