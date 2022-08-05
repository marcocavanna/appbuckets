import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { TabPanelProps } from './TabPanel.types';


/* --------
 * Component Render
 * -------- */
const TabPanel: Creatable<React.FunctionComponent<TabPanelProps>> = (receivedProps) => {

  const props = useWithDefaultProps('tabPanel', receivedProps);

  const {
    className,
    rest: {
      active,
      children,
      content,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(TabPanel, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    { active },
    'tab-panel',
    className
  );

  /** If children are declared, render them */
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
    </ElementType>
  );
};

TabPanel.displayName = 'TabPanel';

TabPanel.create = createShorthandFactory(TabPanel, (content) => ({ content }));

export default TabPanel;
