import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { ContainerProps } from './Container.types';


/* --------
 * Component Render
 * -------- */
const Container: CreatableFunctionComponent<ContainerProps> = (receivedProps) => {

  const props = useWithDefaultProps('container', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      fixedTo,
      fluid,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Container, receivedProps, props);

  const classes = clsx(
    { fluid },
    fixedTo,
    'container',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Container.displayName = 'Container';

Container.create = createShorthandFactory(Container, (content) => ({ content }));

export default Container;
