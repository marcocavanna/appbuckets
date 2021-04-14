import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { AppBucketsComponentProps } from '../generic';

import { ButtonProps } from '../Button';


export interface ItemToolsProps extends AppBucketsComponentProps<StrictItemToolsProps> {
}

export interface StrictItemToolsProps {
  /** Disable Children Use for item tools */
  children?: never;

  /** Disable all tools */
  disabled?: boolean;

  /** Create Tools */
  tools?: ShorthandCollection<ButtonProps>;
}
