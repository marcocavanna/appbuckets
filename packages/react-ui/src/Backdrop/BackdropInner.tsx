import * as React from 'react';
import clsx from 'clsx';

import { childrenUtils } from '@appbuckets/react-ui-core';

import Fade from '../Fade';

import { useWithDefaultProps } from '../BucketTheme';

import { BackdropInnerProps } from './BackdropInner.types';


/* --------
 * Component Render
 * -------- */
const BackdropInner: React.FunctionComponent<BackdropInnerProps> = (receivedProps) => {

  const props = useWithDefaultProps('backdropInner', receivedProps);

  const {
    content,
    children,
    className,
    onClick,
    onClickOutside,
    onExited,
    onEntered,
    timeout,
    verticalAlign,
    visible,
    ...rest
  } = props;


  // ----
  // Define internal Ref to Switch classes and Style
  // ----
  const containerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);


  // ----
  // Build Component Handlers
  // ----
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    /** Call onClick Handler */
    if (onClick) {
      onClick(e, props);
    }

    /** If no ref are been currently loaded, or if no handler has been defined, abort */
    if (!contentRef.current || !containerRef.current || !onClickOutside) {
      return;
    }

    /** If click target is the content background or the container, invoke the handler */
    if (e.target === containerRef.current || e.target === contentRef.current) {
      onClickOutside(e, props);
    }
  };


  // ----
  // Build Element Classes
  // ----
  const classes = clsx(
    { visible },
    verticalAlign && `content-${verticalAlign.replace(/\s/g, '-')}`,
    'backdrop',
    className
  );

  const contentClasses = clsx(
    { visible },
    'content'
  );


  // ----
  // Compute the Inner Content
  // ----
  const innerContent = childrenUtils.isNil(children) ? content : children;


  // ----
  // Render the Content
  // ----
  return (
    <Fade
      ref={containerRef}
      onExited={onExited}
      onEntered={onEntered}
      visible={visible}
      timeout={timeout}
    >
      <div {...rest} className={classes} onClick={handleClick} role={'region'}>
        {innerContent && (
          <div ref={contentRef} className={contentClasses}>
            {innerContent}
          </div>
        )}
      </div>
    </Fade>
  );
};

/** Properly set the Display Name */
BackdropInner.displayName = 'BackdropInner';

export default BackdropInner;
