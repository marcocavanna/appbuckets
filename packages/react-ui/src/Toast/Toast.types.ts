import * as React from 'react';

import { ShorthandItem, ShorthandContent } from '@appbuckets/react-ui-core';

import {
  MouseHandler,
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps
} from '../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../Header';
import { IconProps } from '../Icon';


export interface ToastProps extends UIMutableComponentProps<StrictToastProps>, AppearanceProps {
}

export interface StrictToastProps {
  /** Children component */
  children?: ShorthandContent | ((tools: { dismiss: (e: React.MouseEvent<HTMLElement>) => void }) => void);

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
  onClick?: ToastClickHandler;
}

export type ToastClickHandler = MouseHandler<HTMLElement, ToastProps>;
