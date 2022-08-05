import * as React from 'react';
import clsx from 'clsx';

import {
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import type LabelComponent from './Label';

import { LabelGroupProps } from './LabelGroup.types';


/* --------
 * Component Import to avoid Circular Dependencies
 * -------- */
let Label: typeof LabelComponent | null = null;

import('./Label').then(({ default: labelComponent }) => {
  Label = labelComponent;
});


/* --------
 * Component Render
 * -------- */
const LabelGroup: React.FunctionComponent<LabelGroupProps> = (receivedProps) => {

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
