import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../generic';

import {
  useElementType,
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Icon from '../Icon';

import { BadgeProps } from './Badge.types';


/* --------
 * Component Render
 * -------- */
const Badge: CreatableFunctionComponent<BadgeProps> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('badge', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      icon,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Badge, receivedProps, props);

  /** Check if component has declared children */
  const hasChildren = !childrenUtils.isNil(children);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    'badge',
    stateClasses,
    (!!content || !!hasChildren || !!icon) && 'with-content',
    className
  );

  /** Build Icon Element */
  const iconElement = React.useMemo(
    () => !hasChildren && Icon.create(icon, {
      autoGenerateKey: false
    }),
    // @ts-ignore
    [ icon, hasChildren ]
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        <div className={'content'}>
          {children}
        </div>
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      <div className={'content'}>
        {iconElement}
        {content}
      </div>
    </ElementType>
  );
};

Badge.displayName = 'Badge';

Badge.create = createShorthandFactory(Badge, (content) => ({ content }));

export default Badge;
