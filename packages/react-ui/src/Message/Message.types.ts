import * as React from 'react';

import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  AppBucketsComponentProps,
  AppBucketsIcon,
  SharedComponentStateProps
} from '../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../Header';
import { IconProps } from '../Icon';


export interface MessageProps extends AppBucketsComponentProps<StrictMessageProps>, SharedComponentStateProps {
}

export interface StrictMessageProps {
  /** Message Content */
  content?: ShorthandItem<HeaderSubheaderProps>;

  /** Message Header */
  header?: ShorthandItem<HeaderContentProps>;

  /** Message Icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Message could be dismissed, this callback will be fired on dismiss icon click */
  onDismiss?: (e: React.MouseEvent<SVGSVGElement>, props: MessageProps) => void;
}
