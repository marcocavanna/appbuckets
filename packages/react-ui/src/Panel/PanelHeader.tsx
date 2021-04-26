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

import Header from '../Header';

import { PanelHeaderProps } from './PanelHeader.types';


/* --------
 * Component Render
 * -------- */
const PanelHeader: Creatable<UIMutableComponent<PanelHeaderProps>> = (receivedProps) => {

  const props = useWithDefaultProps('panelHeader', receivedProps);

  const {
    className,
    rest: {
      actions,
      children,
      content,
      subheader,
      icon,
      disabled,
      divided,
      ...rest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(PanelHeader, receivedProps, props);

  const classes = clsx(
    'head',
    className
  );

  const headerElement = React.useMemo(
    () => Header.create({
      actions,
      content,
      subheader,
      icon,
      divided,
      disabled
    }, { autoGenerateKey: false }),
    [ actions, content, subheader, icon, divided, disabled ]
  );

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
    </ElementType>
  );

};

PanelHeader.displayName = 'PanelHeader';

PanelHeader.create = createShorthandFactory(PanelHeader, (content) => ({ content }));

export default PanelHeader;
