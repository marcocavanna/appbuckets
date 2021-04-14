import * as React from 'react';

import useAutoControlledValue from '../useAutoControlledValue';
import useDOMElementEvent from '../useDOMElementEvent';

import Ref from '../Ref';
import { handleRef } from '../utils/refUtils';

import { doesNodeContainClick } from '../utils/doesNodeContainClick';

import { PortalProps } from './Portal.types';
import PortalInner from './PortalInner';


const Portal: React.FunctionComponent<PortalProps> = (props) => {

  const {
    children,
    closeOnDocumentClick,
    closeOnEscape,
    closeOnPortalMouseLeave,
    closeOnTriggerBlur,
    closeOnTriggerClick,
    closeOnTriggerMouseLeave,
    defaultOpen: userDefinedDefaultOpen,
    mountNode,
    mouseEnterDelay,
    mouseLeaveDelay,
    open: userDefinedOpen,
    openOnTriggerClick,
    openOnTriggerFocus,
    openOnTriggerMouseEnter,
    trigger,
    triggerRef: userDefinedTriggerRef,

    onClose  : userDefinedOnCloseHandler,
    onMount  : userDefinedOnMountHandler,
    onOpen   : userDefinedOnOpenHandler,
    onUnmount: userDefinedOnUnmountHandler
  } = props;


  // ----
  // AutoControlled Props
  // ----
  const [ open, trySetOpen ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultOpen,
    prop       : userDefinedOpen
  });


  // ----
  // DOM Ref
  // ----
  const contentRef = React.useRef<HTMLElement>();
  const triggerRef = React.useRef<HTMLElement>();


  // ----
  // Internal Variables
  // ----
  const latestDocumentMouseEvent = React.useRef<MouseEvent | null>(null);
  const mouseEnterTimer = React.useRef<NodeJS.Timeout | null>(null);
  const mouseLeaveTimer = React.useRef<NodeJS.Timeout | null>(null);


  // ----
  // Lifecycle event to cancel timer
  // ----
  const clearMouseEnterTimer = React.useCallback(
    () => {
      if (mouseEnterTimer.current) {
        clearTimeout(mouseEnterTimer.current);
        mouseEnterTimer.current = null;
      }
    },
    []
  );

  const clearMouseLeaveTimer = React.useCallback(
    () => {
      if (mouseEnterTimer.current) {
        clearTimeout(mouseEnterTimer.current);
        mouseEnterTimer.current = null;
      }
    },
    []
  );

  React.useEffect(
    () => () => {
      clearMouseEnterTimer();
      clearMouseLeaveTimer();
    },
    [ clearMouseEnterTimer, clearMouseLeaveTimer ]
  );


  // ----
  // Portal Control
  // ----
  const openPortal = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof userDefinedOnOpenHandler === 'function') {
        userDefinedOnOpenHandler(e);
      }

      trySetOpen(true);
    },
    [ userDefinedOnOpenHandler, trySetOpen ]
  );

  const openPortalWithTimeout = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      return setTimeout(() => openPortal(e), mouseEnterDelay);
    },
    [ openPortal, mouseEnterDelay ]
  );

  const closePortal = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof userDefinedOnCloseHandler === 'function') {
        userDefinedOnCloseHandler(e);
      }

      trySetOpen(false);
    },
    [ userDefinedOnCloseHandler, trySetOpen ]
  );

  const closePortalWithTimeout = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      return setTimeout(() => closePortal(e), mouseLeaveDelay ?? 0);
    },
    [ closePortal, mouseLeaveDelay ]
  );


  // ----
  // Trigger Handler
  // ----
  const handleTriggerRef = (component: HTMLElement) => {
    triggerRef.current = component;
    handleRef(userDefinedTriggerRef, component);
  };

  const triggerOnBlurHandler: ((...args: any[]) => void) | undefined = trigger?.props?.onBlur;
  const handleTriggerBlur = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, ...rest: any[]) => {
      /** Invoke original trigger event handler */
      if (typeof triggerOnBlurHandler === 'function') {
        triggerOnBlurHandler(e, ...rest);
      }

      /** Do not close if focus is given to the portal */
      const target = e.relatedTarget || document.activeElement;
      const didFocusPortal = contentRef.current?.contains(target as Node);

      if (!closeOnTriggerBlur || didFocusPortal) {
        return;
      }

      closePortal(e);
    },
    [ triggerOnBlurHandler, closeOnTriggerBlur, closePortal ]
  );

  const triggerOnClickHandler: ((...args: any[]) => void) | undefined = trigger?.props?.onClick;
  const handleTriggerClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, ...rest: any[]) => {
      /** Invoke original trigger event handler */
      if (typeof triggerOnClickHandler === 'function') {
        triggerOnClickHandler(e, ...rest);
      }

      /** Toggle the Portal */
      if (open && closeOnTriggerClick) {
        closePortal(e);
      }
      else if (!open && openOnTriggerClick) {
        openPortal(e);
      }
    },
    [ closeOnTriggerClick, closePortal, open, openOnTriggerClick, openPortal, triggerOnClickHandler ]
  );

  const triggerOnFocusHandler: ((...args: any[]) => void) | undefined = trigger?.props?.onFocus;
  const handleTriggerFocus = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, ...rest: any[]) => {
      /** Invoke original trigger event handler */
      if (typeof triggerOnFocusHandler === 'function') {
        triggerOnFocusHandler(e, ...rest);
      }

      if (!openOnTriggerFocus) {
        return;
      }

      openPortal(e);
    },
    [ openOnTriggerFocus, openPortal, triggerOnFocusHandler ]
  );

  const triggerOnMouseEnterHandler: ((...args: any[]) => void) | undefined = trigger?.props?.onMouseEnter;
  const handleTriggerMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, ...rest: any[]) => {
      /** Remove mouse leave timer */
      clearMouseLeaveTimer();

      /** Invoke original trigger event handler */
      if (typeof triggerOnMouseEnterHandler === 'function') {
        triggerOnMouseEnterHandler(e, ...rest);
      }

      if (!openOnTriggerMouseEnter) {
        return;
      }

      mouseEnterTimer.current = openPortalWithTimeout(e);
    },
    [ clearMouseLeaveTimer, openOnTriggerMouseEnter, openPortalWithTimeout, triggerOnMouseEnterHandler ]
  );

  const triggerOnMouseLeaveHandler: ((...args: any[]) => void) | undefined = trigger?.props?.onMouseLeave;
  const handleTriggerMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, ...rest: any[]) => {
      /** Remove mouse enter timer */
      clearMouseEnterTimer();

      /** Invoke original trigger event handler */
      if (typeof triggerOnMouseLeaveHandler === 'function') {
        triggerOnMouseLeaveHandler(e, ...rest);
      }

      if (!closeOnTriggerMouseLeave) {
        return;
      }

      mouseLeaveTimer.current = closePortalWithTimeout(e);
    },
    [ clearMouseEnterTimer, closeOnTriggerMouseLeave, closePortalWithTimeout, triggerOnMouseLeaveHandler ]
  );


  // ----
  // Document and DOM Event
  // ----
  const handleDocumentMouseDown = React.useCallback(
    (e: Event) => {
      latestDocumentMouseEvent.current = e as MouseEvent;
    },
    []
  );

  useDOMElementEvent({
    disabled: !closeOnDocumentClick,
    event   : 'mousedown',
    callback: handleDocumentMouseDown
  });

  const handleDocumentClick = React.useCallback(
    (e: Event) => {
      const { current: currentMouseDownEvent } = latestDocumentMouseEvent;
      latestDocumentMouseEvent.current = null;

      const { current: triggerElement } = triggerRef;
      const { current: contentElement } = contentRef;

      /**
       * Ignore the click if there's no Portal
       * or the event happened in trigger, or the event
       * is originated in Portal but ended outside, or the event
       * happened in the portal
       */
      if (
        !contentElement
        || doesNodeContainClick(triggerElement!, e as MouseEvent)
        || (currentMouseDownEvent && doesNodeContainClick(contentElement, currentMouseDownEvent))
        || doesNodeContainClick(contentElement, e as MouseEvent)
      ) {
        return;
      }

      if (closeOnDocumentClick) {
        closePortal(e as any as React.MouseEvent<HTMLElement>);
      }
    },
    [ closeOnDocumentClick, closePortal ]
  );

  useDOMElementEvent({
    disabled: !closeOnDocumentClick,
    event   : 'click',
    callback: handleDocumentClick
  });

  const handleEscapeKey = React.useCallback(
    (e: Event) => {
      if (!closeOnEscape) {
        return;
      }

      if ((e as KeyboardEvent).key === 'Escape') {
        closePortal(e as any as React.MouseEvent<HTMLElement>);
      }
    },
    [ closeOnEscape, closePortal ]
  );

  useDOMElementEvent({
    disabled: !closeOnEscape,
    event   : 'keydown',
    callback: handleEscapeKey
  });


  // ----
  // Portal Mouse Event Handler
  // ----
  const handlePortalMouseEnter = React.useCallback(
    () => {
      if (!closeOnPortalMouseLeave) {
        return;
      }

      clearMouseLeaveTimer();
    },
    [ closeOnPortalMouseLeave, clearMouseLeaveTimer ]
  );

  useDOMElementEvent({
    disabled: !closeOnPortalMouseLeave,
    target  : contentRef.current,
    event   : 'mouseenter',
    callback: handlePortalMouseEnter
  });

  const handlePortalMouseLeave = React.useCallback(
    (e: Event) => {
      if (!closeOnPortalMouseLeave) {
        return;
      }

      if (e.target !== contentRef.current) {
        return;
      }

      mouseLeaveTimer.current = closePortalWithTimeout(e as any as React.MouseEvent<HTMLElement>);
    },
    [ closeOnPortalMouseLeave, closePortalWithTimeout ]
  );

  useDOMElementEvent({
    disabled: !closeOnPortalMouseLeave,
    target  : contentRef.current,
    event   : 'mouseleave',
    callback: handlePortalMouseLeave
  });


  // ----
  // Component Render
  // ----
  return (
    <React.Fragment>
      {open && (
        <PortalInner
          innerRef={contentRef}
          mountNode={mountNode}
          onMount={userDefinedOnMountHandler}
          onUnmount={userDefinedOnUnmountHandler}
        >
          {children}
        </PortalInner>
      )}

      {trigger && (
        <Ref innerRef={handleTriggerRef}>
          {React.cloneElement(trigger, {
            onBlur      : handleTriggerBlur,
            onClick     : openOnTriggerClick || closeOnTriggerClick || triggerOnClickHandler
              ? handleTriggerClick
              : undefined,
            onFocus     : handleTriggerFocus,
            onMouseEnter: handleTriggerMouseEnter,
            onMouseLeave: handleTriggerMouseLeave
          })}
        </Ref>
      )}
    </React.Fragment>
  );
};

Portal.displayName = 'Portal';

Portal.defaultProps = {
  closeOnDocumentClick: true,
  closeOnEscape       : true,
  openOnTriggerClick  : true
};

export default Portal;
