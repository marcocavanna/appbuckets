import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import {
  useSplitStateClassName,
  useSharedClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Icon from '../Icon';
import Header from '../Header';

import { MessageProps } from './Message.types';


/* --------
 * Component Render
 * -------- */
const Message: React.FunctionComponent<MessageProps> = (receivedProps) => {

  const props = useWithDefaultProps('message', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      header,
      icon,
      onDismiss,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get Proper Element type */
  const ElementType = useElementType(Message, receivedProps, props);

  /** Split state classNames */
  const [ stateClassNames, rest ] = useSplitStateClassName(rawRest);

  /** Build class list */
  const classes = clsx(
    typeof onDismiss === 'function' && 'dismissible',
    'message',
    stateClassNames,
    className
  );


  /* --------
   * Component Handlers
   * -------- */
  const handleDismiss = (e: React.MouseEvent<SVGSVGElement>) => {
    if (typeof onDismiss === 'function') {
      onDismiss(e, props);
    }
  };


  /* --------
   * Internal Elements
   * -------- */
  const dismissIcon = typeof onDismiss === 'function' && (
    <Icon name={'times'} className={'dismiss'} onClick={handleDismiss} />
  );

  /* --------
   * Internal Content Generated
   * -------- */
  const messageContent = React.useMemo(
    () => (header || content || icon) && Header.create({
      content  : header,
      subheader: content,
      icon
    }, { autoGenerateKey: false }),
    [ header, content, icon ]
  );


  /* --------
   * If element has children, render them
   * -------- */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {dismissIcon}
        {children}
      </ElementType>
    );
  }


  /* --------
   * Render the Component
   * -------- */
  return (
    <ElementType {...rest} className={classes}>
      {dismissIcon}
      {messageContent}
    </ElementType>
  );
};

Message.displayName = 'Message';

export default Message;
