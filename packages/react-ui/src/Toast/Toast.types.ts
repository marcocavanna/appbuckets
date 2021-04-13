import * as React from 'react';

import {
  AppBucketsComponentProps,
  AppBucketsIcon,
  SharedComponentStateProps,
  ShorthandContent,
  ShorthandItem
} from '../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../Header';
import { IconProps } from '../Icon';


export interface ToastProps extends AppBucketsComponentProps<StrictToastProps>, SharedComponentStateProps {
}

export interface StrictToastProps {
  /** Children component */
  children?: ShorthandContent;

  /** Toast Content */
  content?: ShorthandItem<HeaderSubheaderProps>;

  /** Dismiss Function, used to remove Toast */
  dismiss?: () => void;

  /** Toast is Dismissible */
  dismissible?: boolean | AppBucketsIcon<IconProps>;

  /** Toast Header Content */
  header?: ShorthandItem<HeaderContentProps>;

  /** Toast icon */
  icon?: AppBucketsIcon<IconProps>;

  /** On Click Callback */
  onClick?: (e: React.MouseEvent<HTMLElement>, props: ToastProps) => void;
}
