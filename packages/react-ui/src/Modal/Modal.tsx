import * as React from 'react';
import clsx from 'clsx';

import {
  MountNode,
  childrenUtils,
  useAutoControlledValue,
  useElementType
} from '@appbuckets/react-ui-core';

import { UIMutableComponent } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Backdrop from '../Backdrop';
import Button from '../Button';
import Icon from '../Icon';

import { ModalProps } from './Modal.types';

import { ModalProvider } from './Modal.context';

import ModalActions from './ModalActions';
import ModalContent from './ModalContent';
import ModalHeader from './ModalHeader';


/* --------
 * Component Declare
 * -------- */
type ModalChildren = {
  Actions: typeof ModalActions;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
};


/* --------
 * Component Render
 * -------- */
const Modal: UIMutableComponent<ModalProps> & ModalChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('modal', receivedProps);

  // ----
  // Get Modal Props
  // ----
  const {
    className,
    rest: {
      /** Modal Props */
      actions,
      basic,
      children,
      closeIcon,
      closeOnBackdropClick,
      content,
      header,
      icon,
      mountNode: userDefinedMountNode,
      size,

      /** Modal handlers */
      onActionClick,
      onClose,
      onOpen,

      /** Modal state Prop */
      defaultOpen,
      open: openProp,

      /** Handled Backdrop Props */
      loading,
      loaderProps,
      timeout,

      /** Handled Portal Props */
      closeOnEscape,
      openOnTriggerClick,
      openOnTriggerFocus,
      openOnTriggerMouseEnter,
      trigger,
      triggerRef,

      /** All other Props */
      ...rest
    }
  } = useSharedClassName(props);


  // ----
  // Init Modal Internal State
  // ----
  /** Init the AutoControlled open state */
  const [ open, trySetOpen ] = useAutoControlledValue(
    false,
    { prop: openProp, defaultProp: defaultOpen }
  );
  /** Get the component element type */
  const ElementType = useElementType(Modal, receivedProps, props);
  /** Check if in this render modal has children */
  const hasChildren = !childrenUtils.isNil(children);


  // ----
  // Define Modal Handlers
  // ----
  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    /** Call User Handler if Exists */
    if (onClose) {
      onClose(e, props);
    }
    /** Try to close the modal */
    trySetOpen(false);
  };

  const handleModalOpen = (e: React.MouseEvent<HTMLElement>) => {
    /** Call User Handler if Exists */
    if (onOpen) {
      onOpen(e, props);
    }
    /** Try to open the modal */
    trySetOpen(true);
  };


  // ----
  // Build Component Classes
  // ----
  const contentClasses = clsx(
    'modal',
    size,
    { basic },
    icon && 'with-icon',
    className
  );

  const mountNodeClasses = clsx(
    'dimmable',
    open && 'dimmed'
  );


  // ----
  // Memoized Elements
  // ----
  const modalIconElement = React.useMemo(
    () => icon && Icon.create(icon, {
      autoGenerateKey: false,
      overrideProps  : {
        solid: 'inverted circle'
      }
    }),
    [ icon ]
  );

  const closeIconElement = closeIcon && Button.create({
    icon      : closeIcon,
    flat      : true,
    appearance: 'white shade'
  }, {
    autoGenerateKey: false,
    defaultProps   : { className: 'close' },
    overrideProps  : (predefinedProps) => ({
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        /** Call original user defined handler on icon */
        if (predefinedProps.onClick) {
          predefinedProps.onClick(e, predefinedProps);
        }
        /** Try to close the Modal */
        handleModalClose(e);
      }
    })
  });

  const modalHeaderElement = React.useMemo(
    () => {
      /** Set empty component if is closed */
      if (!open || !header) {
        return null;
      }
      /** Create a new Modal Header using Shorthand Factory */
      return ModalHeader.create(header, { autoGenerateKey: false });
    },
    [ open, header ]
  );

  const modalActionsElement = React.useMemo(
    () => {
      /** Set empty component if is closed */
      if (hasChildren || !open || !actions) {
        return null;
      }
      /** Create modal action element using Shorthand Factory */
      return ModalActions.create(actions, {
        autoGenerateKey: false,
        overrideProps  : (predefinedProps) => ({
          onActionClick: (e, buttonProps) => {
            /** Call predefined on Action Click function */
            if (predefinedProps.onActionClick) {
              predefinedProps.onActionClick(e, buttonProps);
            }
            /** Call modal action click if exists */
            if (onActionClick) {
              onActionClick(e, buttonProps);
            }
          }
        })
      });
    },
    [ hasChildren, open, actions, onActionClick ]
  );


  // ----
  // Init an internal function to build Modal Content
  // ----
  const renderModalContent = () => (
    <ModalProvider value={{ closeModal: handleModalClose }}>
      <ElementType {...rest} className={contentClasses}>
        {/* Apply Class to Mount Node */}
        <MountNode className={mountNodeClasses} node={userDefinedMountNode ?? document.body} />

        {/* Render the Modal Icon if Exists */}
        {modalIconElement}

        {/* Render the Icon Close Element if Exists */}
        {closeIconElement}

        {/* Render the Modal Header */}
        {modalHeaderElement}

        {/* Render Modal Content */}
        {!hasChildren ? (
          <React.Fragment>
            {ModalContent.create(content, { autoGenerateKey: false })}
            {modalActionsElement}
          </React.Fragment>
        ) : children}
      </ElementType>
    </ModalProvider>
  );


  // ----
  // Render the Component
  // ----
  return (
    <Backdrop
      page
      className={'modals'}
      visible={open}
      closeOnBackdropClick={closeOnBackdropClick}
      closeOnDocumentClick={false}
      closeOnEscape={closeOnEscape}
      openOnTriggerClick={openOnTriggerClick}
      openOnTriggerMouseEnter={openOnTriggerMouseEnter}
      openOnTriggerFocus={openOnTriggerFocus}
      trigger={trigger}
      triggerRef={triggerRef}
      verticalAlign={'on top'}
      loading={loading}
      loaderProps={loaderProps}
      timeout={timeout}
      onClose={handleModalClose}
      onOpen={handleModalOpen}
    >
      {renderModalContent()}
    </Backdrop>
  );
};

Modal.displayName = 'Modal';

Modal.Actions = ModalActions;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;

export default Modal;
