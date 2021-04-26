import * as React from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  createShorthandFactory
} from '@appbuckets/react-ui-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { Creatable, UIMutableComponent } from '../generic';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { IconProps } from './Icon.types';


library.add(fas, fab, far);


/* --------
 * Component Render
 * -------- */
const Icon: Creatable<UIMutableComponent<IconProps>> = React.memo<IconProps>((
  receivedProps
) => {

  const props = useWithDefaultProps('icon', receivedProps);

  const {
    className,
    rest: {
      bordered,
      disabled,
      fitted,
      flip,
      iconStyle,
      inverse,
      listItem,
      onClick,
      mask,
      name,
      pulse,
      rotate,
      solid,
      spin,
      transform,
      unspaced,
      ...rawRest
    }
  } = useSharedClassName(props);

  /** Split state className from rest props */
  const [ stateClasses ] = useSplitStateClassName(rawRest);

  /** Handle click, to disabled it if is disabled */
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    /** If icon has been disabled, prevent click */
    if (disabled) {
      e.preventDefault();
      return;
    }
    /** If the onClick function exists, invoke it */
    if (typeof onClick === 'function') {
      onClick(e, props);
    }
  };

  /** Build icon ClassName */
  const classes = clsx(
    'icon',
    stateClasses,
    className,
    solid,
    {
      disabled,
      bordered,
      unspaced,
      clickable: onClick
    }
  );

  /** Solid icon has a different container */
  const hasFragmentContainer = !solid && !bordered;
  const Container: React.ElementType = !hasFragmentContainer ? 'div' : React.Fragment;

  /** Build container props, if React.Fragment, no className is allowed */
  const containerProps = hasFragmentContainer ? {} : { className: classes };

  if (!name) {
    return null;
  }

  /** Draw the element */
  return (
    <Container {...containerProps}>
      <FontAwesomeIcon
        fixedWidth={!fitted}
        className={hasFragmentContainer ? classes : undefined}
        icon={[ iconStyle || 'fas', name ]}
        mask={mask}
        spin={spin}
        pulse={pulse}
        flip={flip}
        inverse={inverse}
        listItem={listItem}
        rotation={rotate}
        transform={transform}
        onClick={handleClick}
        style={rawRest.style}
      />
    </Container>
  );
}) as unknown as CreatableFunctionComponent<IconProps>;

Icon.displayName = 'Icon';

/** Icon could be created using a Shorthand */
Icon.create = createShorthandFactory(Icon, (name) => ({ name: name as any }));

export default Icon;
