import * as React from 'react';
import clsx from 'clsx';

import {
  getElementType,
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { BoxProps } from './Box.types';


const appendValueToClass = (
  prefix: string,
  prop: string | number | undefined
): string | undefined => (typeof prop === 'number' || typeof prop === 'string'
  ? `${prefix}-${prop}`
  : undefined);


/* --------
 * Component Render
 * -------- */
const Box: React.FunctionComponent<BoxProps> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('box', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      elevation,
      m,
      mb,
      ml,
      mr,
      mt,
      mx,
      my,
      p,
      pb,
      pl,
      pr,
      pt,
      px,
      py,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = getElementType(Box, props);

  const classes = React.useMemo(
    () => clsx(
      'box',
      appendValueToClass('elevation', elevation),
      appendValueToClass('m', m),
      appendValueToClass('mb', mb),
      appendValueToClass('ml', ml),
      appendValueToClass('mr', mr),
      appendValueToClass('mt', mt),
      appendValueToClass('mx', mx),
      appendValueToClass('my', my),
      appendValueToClass('p', p),
      appendValueToClass('pb', pb),
      appendValueToClass('pl', pl),
      appendValueToClass('pr', pr),
      appendValueToClass('pt', pt),
      appendValueToClass('px', px),
      appendValueToClass('py', py),
      className
    ),
    [ className, elevation, m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

Box.displayName = 'Box';

export default Box;
