import type * as React from 'react';

// import type * as ReactUI from '@appbuckets/react-ui-core';

import type { UIMutableComponentProps } from '@appbuckets/react-ui-core';


export type TypographyProps = UIMutableComponentProps<StrictTypographyProps, 'p'>;


export interface StrictTypographyProps {
  /** Set default element type and some default style */
  variant?: TypographyVariant;
}

export type TypographyVariant =
  | 'title'
  | 'subtitle1'
  | 'subtitle2'
  | 'paragraph'
  | 'inline'
  | 'button'
  | 'label';
