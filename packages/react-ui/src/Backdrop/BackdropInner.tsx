import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  Ref,
  useElementType
} from '@appbuckets/react-ui-core';

import { useWithDefaultProps } from '../BucketTheme';

import { BackdropInnerProps } from './BackdropInner.types';


/* --------
 * Component Declare
 * -------- */
type BackdropInnerComponent = React.FunctionComponent<BackdropInnerProps>;

/* --------
 * Component Render
 * -------- */
const BackdropInner: BackdropInnerComponent = (receivedProps) => {

  const props = useWithDefaultProps('backdropInner', receivedProps);

  const {
    animated,
    content,
    children,
    className,
    onClick,
    onClickOutside,
    verticalAlign,
    visible,
    ...rest
  } = props;


  // ----
  // Define internal Ref to Switch classes and Style
  // ----
  const containerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  /** Get the render element type */
  const ElementType = useElementType(BackdropInner, receivedProps, props);


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
  // Animate the Backdrop Enter, if is necessary
  // ----
  React.useEffect(
    () => {
      /** Exit if no need to animate container visibility */
      if (!animated) {
        return;
      }

      /** Add/Remove the visible classes */
      setTimeout(() => {
        if (containerRef.current && visible) {
          containerRef.current.classList.add('visible');
        }

        if (contentRef.current && visible) {
          contentRef.current.classList.add('visible');
        }
      });
    },
    [ animated, visible ]
  );

  // ----
  // Build Element Classes
  // ----
  const classes = clsx(
    { visible: !animated && visible, animated },
    verticalAlign && `content-${verticalAlign.replace(/\s/g, '-')}`,
    'backdrop',
    className
  );

  const contentClasses = clsx(
    { visible: !animated && visible, animated },
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
    <Ref innerRef={containerRef}>
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {innerContent && (
          <div ref={contentRef} className={contentClasses}>
            {innerContent}
          </div>
        )}
      </ElementType>
    </Ref>
  );
};

/** Properly set the Display Name */
BackdropInner.displayName = 'BackdropInner';

export default BackdropInner;
