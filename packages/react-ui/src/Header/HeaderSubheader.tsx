import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../generic';

import { getSharedClassNames } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { HeaderSubheaderProps } from './HeaderSubheader.types';


/* --------
 * Component Render
 * -------- */
const HeaderSubheader: CreatableFunctionComponent<HeaderSubheaderProps> = (
  receivedProps
) => {

  const props = useWithDefaultProps('headerSubheader', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = getSharedClassNames(props);

  const ElementType = getElementType(HeaderSubheader, props);

  const classes = clsx(
    'subheader',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

HeaderSubheader.displayName = 'HeaderSubheader';

HeaderSubheader.create = createShorthandFactory(HeaderSubheader, content => ({ content }));

export default HeaderSubheader;
