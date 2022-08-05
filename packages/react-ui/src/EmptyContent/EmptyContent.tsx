import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Button from '../Button';
import Header from '../Header';

import { EmptyContentProps } from './EmptyContent.types';


/* --------
 * Component Render
 * -------- */
const EmptyContent: Creatable<React.FunctionComponent<EmptyContentProps>> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('emptyContent', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      button,
      header,
      icon,
      ...rest
    }
  } = useSharedClassName(props);

  const classes = clsx(
    'empty',
    className
  );

  const ElementType = useElementType(EmptyContent, receivedProps, props);

  const buttonElement = React.useMemo(
    () => Button.create(button, { autoGenerateKey: false }),
    [ button ]
  );

  const headerElement = React.useMemo(
    () => (header || content || icon) && Header.create({
      content  : header,
      subheader: content,
      icon
    }, {
      autoGenerateKey: false,
      overrideProps  : {
        textAlign: 'center'
      }
    }),
    [
      header,
      content,
      icon
    ]
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
      {buttonElement}
    </ElementType>
  );

};

EmptyContent.displayName = 'EmptyContent';

EmptyContent.create = createShorthandFactory(
  EmptyContent,
  (header) => ({ header })
);

export default EmptyContent;
