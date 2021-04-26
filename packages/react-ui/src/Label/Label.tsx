import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  createShorthandFactory,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable, UIMutableComponent } from '../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Button from '../Button';
import Icon from '../Icon';

import { LabelProps } from './Label.types';

import LabelGroup from './LabelGroup';


/* --------
 * Component Declare
 * -------- */
export type LabelChildren = {
  Group: typeof LabelGroup
};

/* --------
 * Component Render
 * -------- */
const Label: Creatable<UIMutableComponent<LabelProps>> & LabelChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('label', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      disabled,
      icon,
      onClick,
      onRemove,
      removable,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(Label, receivedProps, props);

  /** Split state className from rest props */
  const [ stateClasses, rest ] = useSplitStateClassName(rawRest);

  /** Build the element class list */
  const classes = clsx(
    onClick && 'clickable',
    { removable, disabled },
    'label',
    stateClasses,
    className
  );

  /** Use an Hook to define the click handler */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e, props);
    }
  };

  /** Compute the Icon Element */
  const iconElement = React.useMemo(
    () => (Icon.create(icon, {
      autoGenerateKey: false
    })),
    [ icon ]
  );

  /** Compute the Remove Button */
  const removeButton = React.useMemo(
    () => {
      if (!removable) {
        return null;
      }

      const handleLabelRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && onRemove) {
          onRemove(e, props);
        }
      };

      return Button.create(typeof removable === 'boolean'
        ? { icon: 'times' }
        : removable, {
        autoGenerateKey: false,
        defaultProps   : { className: 'remove', icon: 'times' },
        overrideProps  : {
          disabled,
          flat   : true,
          onClick: handleLabelRemove
        }
      });
    },
    [ removable, disabled, onRemove, props ]
  );

  /** Render the Component */
  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      <span className={'content'}>
        {iconElement}
        <span>
          {childrenUtils.isNil(children) ? content : children}
        </span>
        {removeButton}
      </span>
    </ElementType>
  );
};

Label.displayName = 'Label';

Label.Group = LabelGroup;

Label.create = createShorthandFactory(Label, (content) => ({ content }));

export default Label;
