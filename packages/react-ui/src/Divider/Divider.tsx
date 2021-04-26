import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { UIComponent } from '../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { DividerProps } from './Divider.types';


/* --------
 * Component Render
 * -------- */
const Divider: UIComponent<DividerProps> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('divider', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Divider, receivedProps, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Check if component has children */
  const hasChildren = !childrenUtils.isNil(children);

  /** Build the element class list */
  const classes = clsx(
    'horizontal',
    (hasChildren || content) && 'text',
    'divider',
    stateClasses,
    className
  );

  /** Component render */
  return (
    <ElementType {...rest} className={classes}>
      {(hasChildren || content) && (
        <div className={'content'}>
          {hasChildren ? children : content}
        </div>
      )}
    </ElementType>
  );

};

Divider.displayName = 'Divider';

export default Divider;
