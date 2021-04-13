import * as React from 'react';

import { Placement } from '@popperjs/core';
import { Modifier, StrictModifierNames } from 'react-popper';
import { isRefObject, PortalProps } from '@appbuckets/react-ui-core';

import { PopupPosition, PopupProps } from '../Popup.types';


type PopperModifiers = Modifier<StrictModifierNames>;


/**
 * Return memoized PortalProps using user defined portal props and
 * some other props value
 * @param portalProps User defined PortalProps
 * @param rest All PopupProps
 */
export function usePortalProps(portalProps: PortalProps | undefined, rest: PopupProps): PortalProps {
  return React.useMemo(
    () => {
      const memoizedPortalProps: PortalProps = { ...portalProps };

      if (rest.hoverable) {
        memoizedPortalProps.closeOnPortalMouseLeave = true;
        memoizedPortalProps.mouseLeaveDelay = 300;
      }

      if (rest.openOn?.includes('click')) {
        memoizedPortalProps.openOnTriggerClick = true;
        memoizedPortalProps.closeOnTriggerClick = true;
        memoizedPortalProps.closeOnDocumentClick = true;
      }

      if (rest.openOn?.includes('focus')) {
        memoizedPortalProps.openOnTriggerFocus = true;
        memoizedPortalProps.closeOnTriggerBlur = true;
      }

      if (rest.openOn?.includes('hover')) {
        memoizedPortalProps.openOnTriggerMouseEnter = true;
        memoizedPortalProps.closeOnTriggerMouseLeave = true;
        memoizedPortalProps.mouseLeaveDelay = 70;
        memoizedPortalProps.mouseEnterDelay = 50;
      }

      return memoizedPortalProps;
    },
    [ portalProps, rest.openOn, rest.hoverable ]
  );
}


export function usePopperPlacementMapping(position?: PopupPosition): Placement {
  return React.useMemo(
    () => {
      if (!position) {
        return 'auto';
      }

      return {
        auto        : 'auto',
        'auto start': 'auto-start',
        'auto end'  : 'auto-end',

        'top center': 'top',
        'top left'  : 'top-start',
        'top right' : 'top-end',

        'bottom center': 'bottom',
        'bottom left'  : 'bottom-start',
        'bottom right' : 'bottom-end',

        'right center': 'right',
        'left center' : 'left'
      }[position] as Placement;
    },
    [ position ]
  );
}


/**
 * Merge user defined modifiers with default popper modifiers
 *
 * @param defaultModifiers An array of default modifiers
 * @param userDefinedModifiers The user default modifiers
 * @param deps An array of dependencies to append to useMemo
 */
export function usePopperModifiers(
  defaultModifiers: ReadonlyArray<PopperModifiers>,
  userDefinedModifiers: ReadonlyArray<PopperModifiers>,
  deps: ReadonlyArray<any>
): PopperModifiers[] {
  return React.useMemo(
    () => {

      if (!userDefinedModifiers) {
        return defaultModifiers as PopperModifiers[];
      }

      const mergedPopperModifiers: PopperModifiers[] = [
        ...userDefinedModifiers
      ];

      defaultModifiers.forEach((modifier) => {
        if (!mergedPopperModifiers.find((userModifier) => (
          userModifier.name === modifier.name
        ))) {
          mergedPopperModifiers.push(modifier);
        }
      });

      return mergedPopperModifiers;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      defaultModifiers,
      userDefinedModifiers,
      deps
    ]
  );
}


class ReferenceProxy {

  constructor(private ref: React.RefObject<HTMLElement>) {
  }


  getBoundingClientRect(): Partial<DOMRect> {
    return this.ref.current?.getBoundingClientRect() ?? {};
  }


  get clientWidth() {
    return this.getBoundingClientRect().width;
  }


  get clientHeight() {
    return this.getBoundingClientRect().height;
  }


  get parentNode() {
    return this.ref.current?.parentNode;
  }

}

export function useReferenceProxy(reference: React.RefObject<HTMLElement> | HTMLElement | null) {
  return React.useMemo(
    () => {
      return new ReferenceProxy(
        isRefObject(reference) ? reference : { current: reference }
      ) as unknown as HTMLElement;
    },
    [ reference ]
  );
}
