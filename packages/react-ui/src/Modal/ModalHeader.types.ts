import {
  AppBucketsComponentProps,
  ShorthandContent
} from '../generic';

import {
  StrictHeaderProps
} from '../Header';


export interface ModalHeaderProps extends AppBucketsComponentProps<StrictModalHeaderProps> {
}

export interface StrictModalHeaderProps extends StrictHeaderProps {
  /** Set Meta Content */
  meta?: ShorthandContent;
}
