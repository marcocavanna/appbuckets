import { ShorthandContent } from '@appbuckets/react-ui-core';

import { AppBucketsComponentProps } from '../generic';

import {
  StrictHeaderProps
} from '../Header';


export interface ModalHeaderProps extends AppBucketsComponentProps<StrictModalHeaderProps> {
}

export interface StrictModalHeaderProps extends StrictHeaderProps {
  /** Set Meta Content */
  meta?: ShorthandContent;
}
