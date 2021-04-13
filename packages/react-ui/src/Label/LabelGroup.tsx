import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils
} from '@appbuckets/react-ui-core';

import {
  useElementType,
  useSharedClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

// eslint-disable-next-line import/no-named-default
import type { default as LabelComponent } from './Label';

import { LabelGroupProps } from './LabelGroup.types';


/* --------
 * Component Import to avoid Circular Dependencies
 * -------- */
let Label: typeof LabelComponent | null = null;

import('./Label').then(({ default: labelComponent }) => {
  Label = labelComponent;
});


/* --------
 * Component Declare
 * -------- */
type LabelGroupComponent = React.FunctionComponent<LabelGroupProps>;


/* --------
 * Component Render
 * -------- */
const LabelGroup: LabelGroupComponent = (receivedProps) => {

  const props = useWithDefaultProps('labelGroup', receivedProps);

  const {
    className,
    rest: {
      children,
      labels,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(LabelGroup, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'labels',
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
      {Array.isArray(labels) && labels.map((label) => Label && (
        Label.create(label, {
          autoGenerateKey: true
        })
      ))}
    </ElementType>
  );
};

LabelGroup.displayName = 'LabelGroup';

export default LabelGroup;
