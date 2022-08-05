import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps,
  MouseHandler
} from '../generic';

import { HeaderContentProps, HeaderSubheaderProps } from '../Header';
import { IconProps } from '../Icon';


export interface MessageProps extends UIMutableComponentProps<StrictMessageProps>, AppearanceProps {
}

export interface StrictMessageProps {
  /** Message Content */
  content?: ShorthandItem<HeaderSubheaderProps>;

  /** Message Header */
  header?: ShorthandItem<HeaderContentProps>;

  /** Message Icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Message could be dismissed, this callback will be fired on dismiss icon click */
  onDismiss?: MessageDismissHandler;
}

export type MessageDismissHandler = MouseHandler<SVGSVGElement, MessageProps>;
