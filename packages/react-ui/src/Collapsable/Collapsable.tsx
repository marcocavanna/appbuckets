import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  Ref,
  handleRef,
  createShorthandFactory,
  useAutoControlledValue
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { CollapsableProps, CollapsableState } from './Collapsable.types';


/* --------
 * Internal Function
 * -------- */
function nextFrame(callback: FrameRequestCallback): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}


/* --------
 * Component Render
 * -------- */
const Collapsable: Creatable<React.FunctionComponent<CollapsableProps>> = (
  receivedProps
) => {

  const props = useWithDefaultProps('collapsable', receivedProps);

  const {
    className,
    rest: {
      children,
      collapsedHeight,
      content,
      defaultOpen: userDefinedDefaultOpen,
      disabled,
      onChange,
      onClose,
      onOpen,
      open: userDefinedOpen,
      skipAnimation,
      trigger,
      triggerRef: userDefinedTriggerRef,
      ...rest
    }
  } = useSharedClassName(props);


  // ----
  // Memoized Props and Internal Hooks
  // ----
  const contentRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement>();

  const [ , forceUpdate ] = React.useReducer((val: number) => val + 1, 0);

  const [ callbackTick, setCallbackTick ] = React.useState(0);
  const [ isOpen, trySetOpen ] = useAutoControlledValue(false, {
    defaultProp: userDefinedDefaultOpen,
    prop       : userDefinedOpen
  });

  const collapsedVisibility = React.useMemo(
    (): React.CSSProperties['visibility'] => (collapsedHeight === 0 ? 'hidden' : 'unset'),
    [ collapsedHeight ]
  );


  // ----
  // Internal State
  // ----
  const state = React.useRef<CollapsableState>({
    collapse: isOpen ? 'expanded' : 'collapsed',
    style   : {
      height    : isOpen ? '' : collapsedHeight,
      visibility: isOpen ? 'unset' : collapsedVisibility
    }
  }).current;


  // ----
  // Handlers and Callbacks
  // ----
  const onCallback = React.useCallback(
    <T extends (...args: any[]) => any>(callback?: T, params?: Parameters<T>) => {
      if (typeof callback === 'function') {
        if (Array.isArray(params)) {
          callback(...params);
        }
        else {
          callback();
        }
      }
    },
    []
  );

  const getElementHeight = React.useCallback(
    (): string => `${contentRef.current?.scrollHeight || 0}px`,
    []
  );

  const setCollapsed = React.useCallback(
    () => {
      /** If no ref, return */
      if (!contentRef.current) {
        return;
      }

      /** Update the State */
      state.collapse = 'collapsed';

      state.style = {
        height    : collapsedHeight,
        visibility: collapsedVisibility
      };

      forceUpdate();

      setTimeout(() => {
        setCallbackTick(Date.now());
      }, 0);
    },
    [
      collapsedHeight,
      collapsedVisibility,
      state
    ]
  );

  const setCollapsing = React.useCallback(
    () => {
      /** If no ref, return */
      if (!contentRef.current) {
        return;
      }

      /** If must avoid animation, skip */
      if (skipAnimation) {
        return setCollapsed();
      }

      /** Update the State */
      state.collapse = 'collapsing';

      state.style = {
        height    : getElementHeight(),
        visibility: 'unset'
      };

      forceUpdate();

      nextFrame(() => {
        if (!contentRef.current) {
          return;
        }

        if (state.collapse !== 'collapsing') {
          return;
        }

        state.style = {
          height    : collapsedHeight,
          visibility: 'unset'
        };

        setCallbackTick(Date.now());
      });
    },
    [
      collapsedHeight,
      getElementHeight,
      setCollapsed,
      skipAnimation,
      state
    ]
  );

  const setExpanded = React.useCallback(
    () => {
      /** If no ref, return */
      if (!contentRef.current) {
        return;
      }

      /** Update the State */
      state.collapse = 'expanded';

      state.style = {
        height    : '',
        visibility: 'unset'
      };

      forceUpdate();

      setTimeout(() => {
        setCallbackTick(Date.now());
      }, 0);
    },
    [ state ]
  );

  const setExpanding = React.useCallback(
    () => {
      /** If no ref, return */
      if (!contentRef.current) {
        return;
      }

      /** If must avoid animation, skip */
      if (skipAnimation) {
        return setExpanded();
      }

      /** Update state */
      state.collapse = 'expanding';

      nextFrame(() => {
        /** If no ref, return */
        if (!contentRef.current) {
          return;
        }

        if (state.collapse !== 'expanding') {
          return;
        }

        state.style = {
          height    : getElementHeight(),
          visibility: 'unset'
        };

        setCallbackTick(Date.now());
      });
    },
    [
      getElementHeight,
      setExpanded,
      skipAnimation,
      state
    ]
  );

  const handleTransitionEnd = React.useCallback<React.TransitionEventHandler<HTMLDivElement>>(
    ({ target, propertyName }) => {
      /** Skip other transition */
      if (target !== contentRef.current || propertyName !== 'height') {
        return;
      }

      const { height } = (target as any).style;

      /** Properly continue transition */
      switch (state.collapse) {
        case 'expanding':
          if (!(height === '' || height === `${collapsedHeight}px`)) {
            setExpanded();
          }
          break;

        case 'collapsing':
          if (!(height === '' || height !== `${collapsedHeight}px`)) {
            setCollapsed();
          }
          break;

        default:
          break;
      }
    },
    [
      collapsedHeight,
      setExpanded,
      setCollapsed,
      state.collapse
    ]
  );

  const handleTriggerRef = React.useCallback(
    (component: HTMLElement) => {
      triggerRef.current = component;
      if (userDefinedTriggerRef !== undefined) {
        handleRef(userDefinedTriggerRef, component);
      }
    },
    [ userDefinedTriggerRef ]
  );

  const handleCollapsableToggle = React.useCallback(
    () => {
      /** Abort if Disabled */
      if (disabled) {
        return;
      }

      if (state.collapse === 'collapsed' || state.collapse === 'collapsing') {
        /** Invoke user defined callback */
        if (typeof onOpen === 'function') {
          onOpen(state);
        }
        /** Try setting State */
        trySetOpen(true);
      }
      else if (state.collapse === 'expanded' || state.collapse === 'expanding') {
        /** Invoke user defined callback */
        if (typeof onClose === 'function') {
          onClose(state);
        }
        /** Try setting State */
        trySetOpen(false);
      }
    },
    [
      disabled,
      onClose,
      onOpen,
      state,
      trySetOpen
    ]
  );


  // ----
  // LifeCycle Events
  // ----

  /** Simulate getDerivedStateFromProps */
  const didOpen = state.collapse === 'expanding' || state.collapse === 'expanded';

  React.useEffect(
    () => {
      if (callbackTick) {
        onCallback(onChange, [ state ]);
      }
    },
    // This effect is used to auto invoke on state change
    // only once the callbackTick will be update.
    // Callback Tick must be the only dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ callbackTick ]
  );

  React.useEffect(
    () => {
      if (isOpen && !didOpen && !disabled) {
        setExpanding();
      }
      else if (!isOpen && didOpen && !disabled) {
        setCollapsing();
      }
    },
    // This effect is used to set the animation start
    // while opening or closing the collapsable element
    // In this case, the only dependencies of the Effect
    // must be the open state and the internal didOpen state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ didOpen, isOpen ]
  );


  // ----
  // Class List Building
  // ----
  const classes = clsx(
    {
      disabled,
      opening: state.collapse === 'expanding',
      opened : state.collapse === 'expanded' || state.collapse === 'expanding',
      closing: state.collapse === 'collapsing',
      closed : state.collapse === 'collapsed' || state.collapse === 'collapsing'
    },
    'collapsable',
    className
  );


  // ----
  // Trigger Element
  // ----
  const triggerElement = React.useMemo(
    () => {
      if (!trigger) {
        return null;
      }

      return (
        <Ref innerRef={handleTriggerRef}>
          {React.cloneElement(trigger, {
            onClick: handleCollapsableToggle
          })}
        </Ref>
      );
    },
    [
      handleCollapsableToggle,
      handleTriggerRef,
      trigger
    ]
  );


  // ----
  // Component Render
  // ----
  const collapsableContent = childrenUtils.isNil(children) ? content : children;

  const contentStyle: React.CSSProperties = {
    overflow: state.collapse === 'expanded' ? '' : 'hidden',
    ...state.style
  };

  return (
    <div {...rest} className={classes}>
      {triggerElement && (
        <div className={'trigger'}>
          {triggerElement}
        </div>
      )}
      <div
        ref={contentRef}
        className={'content'}
        style={contentStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {collapsableContent}
      </div>
    </div>
  );
};

Collapsable.displayName = 'Collapsable';

Collapsable.create = createShorthandFactory(Collapsable, (content) => ({
  content
}));

export default Collapsable;
