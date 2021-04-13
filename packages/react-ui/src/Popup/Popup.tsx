import * as React from 'react';
import clsx from 'clsx';

import EventStack, { instance as eventStack } from '@semantic-ui-react/event-stack';

import { usePopper } from 'react-popper';

import {
  childrenUtils,
  Portal,
  PortalProps
} from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useElementType
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

// eslint-disable-next-line import/no-named-default
import type { default as HeaderComponent } from '../Header';

import { PopupProps } from './Popup.types';
import {
  usePopperModifiers,
  usePopperPlacementMapping,
  usePortalProps
} from './lib/internalHooks';


let Header: typeof HeaderComponent | null = null;

import('../Header/Header').then(({ default: importedHeader }) => {
  Header = importedHeader;
});


/* --------
 * Component Render
 * -------- */
const Popup: React.FunctionComponent<PopupProps> = (receivedProps) => {

  const props = useWithDefaultProps('popup', receivedProps);

  // ----
  // Destructuring Props
  // ----
  const {
    className,
    rest: {
      children,
      content,
      basic,
      disabled,
      hideOnScroll,
      hideOnScrollDelay,
      hoverable,
      inverted,
      offset,
      onClose,
      onMount,
      onOpen,
      onOutsideClick,
      onUnmount,
      openOn,
      position,
      popperModifiers: userDefinedPopperModifiers,
      portalProps    : userDefinedPortalProps,
      updateDependencies,
      trigger,
      style: userDefinedStyle,
      ...rest
    }
  } = useSharedClassName(props);


  // ----
  // Reference Handling
  // ----
  const [ referenceElement, setReferenceElement ] = React.useState<HTMLElement | null>();
  const [ popperElement, setPopperElement ] = React.useState<HTMLElement | null>();


  // ----
  // Internal State Definition
  // ----
  const [ closed, setClosed ] = React.useState<boolean>(false);
  const [ closeTimeout, setCloseTimeout ] = React.useState<NodeJS.Timeout | number>();


  // ----
  // Popper Building
  // ----
  const popperModifiers = usePopperModifiers(
    [
      { name: 'arrow', enabled: false },
      { name: 'offset', enabled: !!offset, options: { offset } },
      { name: 'preventOverflow', enabled: false }
    ],
    userDefinedPopperModifiers ?? [],
    [ offset ]
  );

  /** Get Popper Placement using Position */
  const popperPlacement = usePopperPlacementMapping(position);

  const {
    styles: popperStyle,
    attributes,
    update: scheduleUpdate
  } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: popperModifiers,
      placement: popperPlacement
    }
  );


  // ----
  // Component LifeCycle Hooks
  // ----
  React.useEffect(
    () => {
      /** On Dependencies Update, reload Position */
      if (scheduleUpdate) {
        scheduleUpdate();
      }
    },
    // eslint-disable-next-line
    updateDependencies ? [ scheduleUpdate, ...updateDependencies ] : [ scheduleUpdate, true ]
  );

  React.useEffect(
    () => () => {
      /** On Component Unmount, clear close Timer */
      if (closeTimeout) {
        clearTimeout(closeTimeout as NodeJS.Timeout);
      }
    },
    [ closeTimeout ]
  );


  // ----
  // Component Internal Hooks
  // ----
  const ElementType = useElementType(Popup, receivedProps, props);
  const portalProps: PortalProps = usePortalProps(userDefinedPortalProps, props);


  // ----
  // Avoid Component Render if Popup is Closed or Disabled
  // ----
  if (closed || disabled) {
    return trigger ?? null;
  }


  // ----
  // Portal Event Handling
  // ----
  const handlePortalClose = (event: React.MouseEvent<HTMLElement>) => {
    if (typeof onClose === 'function') {
      onClose(event, props);
    }
  };

  const handlePortalMount = () => {
    if (typeof onMount === 'function') {
      onMount(null, props);
    }
  };

  const handlePortalOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (typeof onOpen === 'function') {
      onOpen(event, props);
    }
  };

  const handlePortalUnmount = () => {
    if (typeof onUnmount === 'function') {
      onUnmount(null, props);
    }
  };

  const handlePopupClick = props.openOn?.includes('click')
    ? (event: React.MouseEvent<HTMLElement>) => {
      if (!basic && !inverted) {
        event.stopPropagation();
      }
    }
    : undefined;


  // ----
  // Scroll Handler
  // ----
  const handleHideOnScroll = (event: Event) => {
    setClosed(true);

    eventStack.unsub('scroll', handleHideOnScroll, { target: 'window' });

    setCloseTimeout(setTimeout(() => {
      setClosed(false);
    }, hideOnScrollDelay));

    handlePortalClose(event as unknown as React.MouseEvent<HTMLElement>);
  };


  // ----
  // Popup Content Build
  // ----
  const style: React.CSSProperties = {
    left : 'auto',
    right: 'auto',
    ...popperStyle.popper,
    ...userDefinedStyle
  };

  const classes = clsx(
    'visible',
    { inverted, basic, hoverable },
    position,
    'popup',
    className
  );

  /** Build Content */
  const popupContent = (
    <ElementType
      {...rest}
      ref={setPopperElement}
      className={classes}
      style={style}
      onClick={handlePopupClick}
      {...attributes.popper}
    >
      <div className={'content'}>
        {
          childrenUtils.isNil(children)
            ? Header && Header.create(content, { autoGenerateKey: false })
            : children
        }
      </div>

      {hideOnScroll && (
        <EventStack
          on={handleHideOnScroll}
          name={'scroll'}
          target={'window'}
        />
      )}
    </ElementType>
  );


  // ----
  // Component Render
  // ----
  return (
    <Portal
      {...portalProps}
      trigger={trigger}
      triggerRef={setReferenceElement}
      onClose={handlePortalClose}
      onMount={handlePortalMount}
      onOpen={handlePortalOpen}
      onUnmount={handlePortalUnmount}
    >
      {popupContent}
    </Portal>
  );
};

Popup.displayName = 'Popup';

export default Popup;
