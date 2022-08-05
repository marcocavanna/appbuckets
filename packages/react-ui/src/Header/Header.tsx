import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory,
  getElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { getSharedClassNames, useSplitStateClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Button from '../Button';
import Icon from '../Icon';

import HeaderContent from './HeaderContent';
import HeaderSubheader from './HeaderSubheader';

import { HeaderProps } from './Header.types';


/* --------
 * Component Declare
 * -------- */
export type HeaderChildren = {
  Content: typeof HeaderContent;
  Subheader: typeof HeaderSubheader;
};


/* --------
 * Component Render
 * -------- */
const Header: Creatable<React.FunctionComponent<HeaderProps>> & HeaderChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('header', receivedProps);

  const {
    className,
    rest: {
      actions,
      children,
      content,
      disabled,
      divided,
      icon,
      inverted,
      subheader,
      solid,
      ...rawRest
    }
  } = getSharedClassNames(props);

  /** Get the component element type */
  const ElementType = getElementType(Header, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  const classes = clsx(
    {
      solid,
      inverted,
      disabled,
      divided,
      'with-icon'   : icon,
      'with-actions': Array.isArray(actions)
    },
    'header',
    stateClasses,
    className
  );

  const hasChildren = !childrenUtils.isNil(children);

  const contentElement = React.useMemo(
    () => !hasChildren && HeaderContent.create(content, { autoGenerateKey: false }),
    [ hasChildren, content ]
  );

  const subheaderElement = React.useMemo(
    () => !hasChildren && HeaderSubheader.create(subheader, { autoGenerateKey: false }),
    [ hasChildren, subheader ]
  );

  const iconElement = React.useMemo(
    () => Icon.create(icon, {
      autoGenerateKey: false,
      defaultProps   : {
        solid: solid && props.textAlign === 'center'
          ? inverted ? 'inverted circle' : 'circle'
          : undefined
      }
    }),
    // @ts-ignore
    [ icon, solid, inverted, props.textAlign ]
  );

  const actionsElement = React.useMemo(
    () => {
      if (!Array.isArray(actions)) {
        return null;
      }

      return (
        <div className={'header-actions'}>
          {actions.map((action) => Button.create(action, {
            autoGenerateKey: true,
            defaultProps   : {
              className: 'action'
            }
          }))}
        </div>
      );
    },
    [ actions ]
  );

  return (
    <ElementType {...rest} className={classes}>
      {iconElement && (
        <div className={'header-icon'}>
          {iconElement}
        </div>
      )}
      <div className={'header-content'}>
        {hasChildren ? children : (
          <React.Fragment>
            {contentElement}
            {subheaderElement}
          </React.Fragment>
        )}
      </div>
      {actionsElement}
    </ElementType>
  );
};

Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;

Header.displayName = 'Header';

Header.create = createShorthandFactory(Header, content => ({ content }));

export default Header;
