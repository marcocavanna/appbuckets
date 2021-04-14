import * as React from 'react';


/**
 * Pass the children props to check if they are nil.
 * @param children
 */
export function isNil(children: React.ReactNode): children is null | undefined {
  return React.Children.count(children) === 0;
}
