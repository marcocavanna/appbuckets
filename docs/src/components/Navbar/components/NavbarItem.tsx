import * as React from 'react';
import clsx from 'clsx';

import { childrenUtils } from '@appbuckets/react-ui-core';


/* --------
 * Component Interfaces
 * -------- */
export type NavBarItemProps = JSX.IntrinsicElements['div'] & {
  /** Set is Active */
  active?: boolean;
  /** Change default element type */
  as?: React.ElementType;
  /** Users defined className */
  className?: string;
  /** Content Shorthand */
  content?: React.ReactNode;
  /** Draw a vertical divider */
  divided?: boolean;
  /** As the NavBar Item can be used as a Link, href is mandatory */
  href?: string;
  /** Navigate Function */
  navigate?: () => void;
  /** Place the Item on the right */
  pullRight?: boolean;
};


/* --------
 * Component Definition
 * -------- */
const NavBarItem: React.FunctionComponent<NavBarItemProps> = (
  props
) => {
  const {
    active,
    as,
    children,
    className,
    content,
    divided,
    href,
    navigate,
    pullRight,
    onClick,
    ...rest
  } = props;

  const classes = clsx(
    'navbar-item',
    {
      active,
      divided,
      'right-item': pullRight
    },
    className
  );

  const ElementType = as ?? (href ? 'a' : 'div');

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (typeof navigate === 'function') {
        navigate();
      }

      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [ onClick, navigate ]
  );

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};

NavBarItem.displayName = 'NavBarItem';

export default NavBarItem;
