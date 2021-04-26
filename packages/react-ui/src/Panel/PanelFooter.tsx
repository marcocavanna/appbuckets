import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable, UIMutableComponent } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { PanelFooterProps } from './PanelFooter.types';


/* --------
 * Component Render
 * -------- */
const PanelFooter: Creatable<UIMutableComponent<PanelFooterProps>> = (receivedProps) => {

  const props = useWithDefaultProps('panelFooter', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelFooter, receivedProps, props);

  const classes = clsx(
    'foot',
    className
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

};

PanelFooter.displayName = 'PanelFooter';

PanelFooter.create = createShorthandFactory(PanelFooter, (content) => ({ content }));

export default PanelFooter;
