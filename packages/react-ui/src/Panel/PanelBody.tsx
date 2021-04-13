import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { CreatableFunctionComponent } from '../generic';

import {
  useElementType,
  useSharedClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { PanelBodyProps } from './PanelBody.types';

import Button from '../Button';


/* --------
 * Component Render
 * -------- */
const PanelBody: CreatableFunctionComponent<PanelBodyProps> = (receivedProps) => {

  const props = useWithDefaultProps('panelBody', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      fab,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelBody, receivedProps, props);

  const classes = clsx(
    'body',
    Array.isArray(fab) && !!fab.length && 'with-fab',
    className
  );

  /** Build Fab Buttons */
  const fabButtons = React.useMemo(
    () => (Array.isArray(fab)
      ? fab.map((buttonProps) => Button.create(buttonProps, { autoGenerateKey: true, overrideProps: { fab: true } }))
      : []),
    [ fab ]
  );

  const fabsElement = !!fabButtons.length && (
    <div className={'fabs'}>
      {fabButtons}
    </div>
  );

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
      {fabsElement}
    </ElementType>
  );

};

PanelBody.displayName = 'PanelBody';

PanelBody.create = createShorthandFactory(PanelBody, (content) => ({ content }));

export default PanelBody;
