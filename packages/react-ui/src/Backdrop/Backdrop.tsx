import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  createShorthandFactory,
  childrenUtils,
  isBrowser as checkIsBrowser,
  Portal
} from '@appbuckets/react-ui-core';

import { useWithDefaultProps } from '../BucketTheme';

import BackdropInner from './BackdropInner';
import Loader from '../Loader';

import { BackdropProps } from './Backdrop.types';


/* --------
 * Component Declare
 * -------- */
type BackdropChildren = { Inner: typeof BackdropInner };


/* --------
 * Component Render
 * -------- */
const Backdrop: CreatableFunctionComponent<BackdropProps> & BackdropChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('backdrop', receivedProps);

  // ----
  // Get Backdrop Props
  // ----
  const {
    /** Backdrop Props */
    className,
    closeOnBackdropClick,
    children,
    content,
    loading,
    loaderProps,
    onEntered: userDefinedOnEntered,
    onExited : userDefinedOnExited,
    page,
    visible,

    /** Handled Portal Props */
    closeOnDocumentClick,
    closeOnEscape,
    onClose,
    onMount,
    onOpen,
    onUnmount,
    openOnTriggerClick,
    openOnTriggerFocus,
    openOnTriggerMouseEnter,
    trigger,
    triggerRef,

    /** OnClick must be stripped to rest props passed down to Backdrop Inner */
    onClick,

    /** All other Props */
    ...rest
  } = props;

  /** Check if code is running on browser */
  const isBrowser = React.useMemo(
    () => checkIsBrowser(),
    []
  );


  // ----
  // Check if this is a nested backdrop.
  // Nested backdrop must not change body classList
  // Change is demanded to primary backdrop
  // ----
  const [ isNestedBackdrop ] = React.useState(document.body.classList.contains('dimmed'));


  // ----
  // Save the state of the Inner Backdrop
  // to close using transition
  // ----
  const [ backdropInnerVisible, setBackdropInnerVisible ] = React.useState<boolean>(!!visible);


  // ----
  // Define Backdrop Handlers
  // ----
  const handlePortalMount = () => {
    /** Set document class only if this is the first backdrop */
    if (isBrowser && !isNestedBackdrop) {
      document.body.classList.add('dimmable');
      document.body.classList.add('dimmed');
    }

    if (onMount) {
      onMount(null, props);
    }
  };

  const handlePortalUnmount = () => {
    /** Remove Document class only if this is the last backdrop */
    if (isBrowser && !isNestedBackdrop) {
      document.body.classList.remove('dimmable');
      document.body.classList.remove('dimmed');
    }

    if (onUnmount) {
      onUnmount(null, props);
    }
  };

  const handlePortalOpen = (e: React.MouseEvent<HTMLElement>) => {
    if (onOpen) {
      onOpen(e, props);
    }
  };

  const handlePortalClose = (e: React.MouseEvent<HTMLElement>) => {
    if (onClose) {
      onClose(e, props);
    }
  };

  const handleOutsideContentClick = (e: React.MouseEvent<HTMLElement>) => {
    if (visible && closeOnBackdropClick) {
      handlePortalClose(e);
    }
  };

  const handleBackdropInnerExited = (element: HTMLElement) => {
    setBackdropInnerVisible(false);

    if (typeof userDefinedOnExited === 'function') {
      userDefinedOnExited(element);
    }
  };

  const handleBackdropInnerEntered = (element: HTMLElement) => {
    setBackdropInnerVisible(true);

    if (typeof userDefinedOnEntered === 'function') {
      userDefinedOnEntered(element, false);
    }
  };


  // ----
  // Define Classes
  // ----
  const innerClasses = clsx(
    className,
    { loading, page }
  );


  // ----
  // Memoized Elements
  // ----
  const innerContent = (
    <BackdropInner
      {...rest}
      className={innerClasses}
      visible={visible}
      onClickOutside={handleOutsideContentClick}
      onEntered={handleBackdropInnerEntered}
      onExited={handleBackdropInnerExited}
    >
      {loading
        ? Loader.create(
          { appearance: 'white', size: 'big', centered: true, ...loaderProps },
          { autoGenerateKey: false }
        )
        : (childrenUtils.isNil(children) ? content : children)}
    </BackdropInner>
  );

  /** Return the Dimmer */
  if (page) {
    return (
      <Portal
        closeOnEscape={closeOnEscape}
        closeOnDocumentClick={closeOnDocumentClick}
        open={visible || backdropInnerVisible}
        openOnTriggerClick={openOnTriggerClick}
        openOnTriggerMouseEnter={openOnTriggerMouseEnter}
        openOnTriggerFocus={openOnTriggerFocus}
        trigger={trigger}
        triggerRef={triggerRef}
        onClose={handlePortalClose}
        onOpen={handlePortalOpen}
        onMount={handlePortalMount}
        onUnmount={handlePortalUnmount}
      >
        {innerContent}
      </Portal>
    );
  }

  /** Else, return the Backdrop Inner Content */
  return innerContent;
};

/** Properly set the Display Name */
Backdrop.displayName = 'Backdrop';

/** Append Child Component */
Backdrop.Inner = BackdropInner;

/** Backdrop could be created using shorthand */
Backdrop.create = createShorthandFactory(Backdrop, (content) => ({ content }));

export default Backdrop;
