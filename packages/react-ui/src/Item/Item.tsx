import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Avatar from '../Avatar';

import { ItemProps } from './Item.types';

import ItemContent from './ItemContent';
import ItemGroup from './ItemGroup';
import ItemTools from './ItemTools';


/* --------
 * Component Declare
 * -------- */
export type ItemChildren = {
  Avatar: typeof Avatar;
  Content: typeof ItemContent;
  Group: typeof ItemGroup;
  Tools: typeof ItemTools;
};

/* --------
 * Component Render
 * -------- */
const Item: Creatable<React.FunctionComponent<ItemProps>> & ItemChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('item', receivedProps);

  const {
    className,
    rest: {
      active,
      avatar,
      centered,
      children,
      content,
      disabled,
      header,
      loading,
      meta,
      onClick,
      solid,
      tools,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Item, receivedProps, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    {
      active,
      disabled,
      centered,
      clickable: onClick,
      loading,
      solid
    },
    'item',
    stateClasses,
    className
  );

  const hasChildren = !childrenUtils.isNil(children);

  /** Define Click Handler */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    /** Avoid click when disabled */
    if (disabled) {
      return;
    }

    /** Call user defined handler */
    if (onClick) {
      onClick(e, props);
    }
  };


  // ----
  // Define Component Memoized Element
  // ----
  const avatarElement = React.useMemo(
    () => !hasChildren && Avatar.create(avatar, {
      autoGenerateKey: false,
      defaultProps   : {
        disabled,
        success   : props.success,
        danger    : props.danger,
        appearance: props.appearance,
        warning   : props.warning,
        primary   : props.primary
      }
    }),
    [
      hasChildren,
      avatar,
      disabled,
      props.success,
      props.danger,
      props.appearance,
      props.warning,
      props.primary
    ]
  );

  const contentElement = React.useMemo(
    () => !hasChildren && (loading || header || content || meta) && ItemContent.create({
      header,
      content,
      meta,
      loading
    }, {
      autoGenerateKey: false
    }),
    [ hasChildren, loading, header, content, meta ]
  );

  const toolsElement = React.useMemo(
    () => !hasChildren && ItemTools.create(tools, {
      autoGenerateKey: false,
      defaultProps   : {
        disabled
      }
    }),
    [ disabled, hasChildren, tools ]
  );

  // ----
  // Component render with declared children
  // ----
  if (hasChildren) {
    return (
      <ElementType {...rest} onClick={handleClick} className={classes}>
        {children}
      </ElementType>
    );
  }


  // ----
  // Component render with shorthand
  // ----
  return (
    <ElementType {...rest} onClick={handleClick} className={classes}>
      {avatarElement}
      {contentElement}
      {toolsElement}
    </ElementType>
  );
};

Item.displayName = 'Item';

Item.Avatar = Avatar;
Item.Content = ItemContent;
Item.Tools = ItemTools;
Item.Group = ItemGroup;

Item.create = createShorthandFactory(Item, (content) => ({ content }));

export default Item;
