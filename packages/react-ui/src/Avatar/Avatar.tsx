import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils, createHTMLImage,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Badge from '../Badge';
import Icon from '../Icon';
import Popup from '../Popup';

import { AvatarProps } from './Avatar.types';


/* --------
 * Component Render
 * -------- */
const Avatar: Creatable<React.FunctionComponent<AvatarProps>> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('avatar', receivedProps);

  const {
    className,
    rest: {
      badge,
      content,
      children,
      disabled,
      flat,
      image,
      icon,
      onClick,
      tooltip,
      type,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Avatar, receivedProps, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    {
      badged   : badge,
      disabled,
      clickable: onClick,
      flat,
      image
    },
    type,
    'avatar',
    stateClasses,
    className
  );

  /** Check if Component has Children */
  const hasChildren = !childrenUtils.isNil(children);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    /** Call user defined handler */
    if (onClick && !disabled) {
      /** Disable event propagation */
      e.stopPropagation();

      onClick(e, props);
    }
  };


  // ----
  // Build Memoized Element
  // ----
  const avatarContentElement = React.useMemo(
    () => {
      if (hasChildren || image) {
        return null;
      }

      if (icon) {
        return Icon.create(icon, { autoGenerateKey: false });
      }

      return content;
    },
    [ image, icon, content, hasChildren ]
  );

  const imageContentElement = React.useMemo(
    () => image && createHTMLImage(image, {
      autoGenerateKey: false,
      defaultProps   : {
        alt: 'avatar-image'
      }
    }),
    [ image ]
  );

  const badgeElement = React.useMemo(
    () => (badge === true
      ? <Badge />
      : Badge.create(badge, {
        autoGenerateKey: false
      })),
    [ badge ]
  );


  // ----
  // Build the Element that could be wrapped inside a tooltip
  // ----
  const avatarElement = (
    <ElementType {...rest} onClick={handleClick} className={classes}>
      {!image && (
        <div className={'content'}>
          {hasChildren ? children : avatarContentElement}
        </div>
      )}
      {imageContentElement}
      {badgeElement}
    </ElementType>
  );

  return tooltip && !disabled
    ? (
      <Popup
        trigger={avatarElement}
        content={tooltip}
      />
    )
    : avatarElement;
};

Avatar.displayName = 'Avatar';

Avatar.create = createShorthandFactory(Avatar, (content) => ({ content }));

export default Avatar;
