import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { PanelProps } from './Panel.types';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFooter from './PanelFooter';

import Loader from '../Loader';


/* --------
 * Component Declare
 * -------- */
type PanelChildren = {
  Body: typeof PanelBody;
  Footer: typeof PanelFooter;
  Header: typeof PanelHeader;
};

/* --------
 * Component Render
 * -------- */
const Panel: CreatableFunctionComponent<PanelProps> & PanelChildren = (receivedProps) => {

  const props = useWithDefaultProps('panel', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      fab,
      footer,
      disabled,
      loading,
      header,
      solid,
      table,
      ...rawRest
    }
  } = useSharedClassName(props);

  const ElementType = useElementType(Panel, receivedProps, props);

  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  const classes = clsx(
    {
      solid,
      disabled         : disabled || loading,
      loading,
      'table-container': table
    },
    'panel',
    className,
    stateClasses
  );

  /** Use shorthand to build panel elements */
  const loaderElement = React.useMemo(
    () => loading && Loader.create({ size: 'big' }, { autoGenerateKey: false }),
    [ loading ]
  );

  const headerElement = React.useMemo(
    () => PanelHeader.create(header, { autoGenerateKey: false }),
    [ header ]
  );

  const footerElement = React.useMemo(
    () => PanelFooter.create(footer, { autoGenerateKey: false }),
    [ footer ]
  );

  /** If children exists, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const bodyContent = childrenUtils.isNil(children) ? content : children;

  /** Return the Panel */
  return (
    <ElementType {...rest} className={classes}>
      {loaderElement}
      {headerElement}
      {bodyContent && (
        <PanelBody fab={fab}>
          {bodyContent}
        </PanelBody>
      )}
      {footerElement}
    </ElementType>
  );

};

Panel.displayName = 'Panel';

Panel.create = createShorthandFactory(Panel, (content) => ({ content }));

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export default Panel;
