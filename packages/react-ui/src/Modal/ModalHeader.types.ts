import { ShorthandContent } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps } from '../generic';

import { StrictHeaderProps } from '../Header';


export interface ModalHeaderProps extends UIMutableComponentProps<StrictModalHeaderProps> {
}

export interface StrictModalHeaderProps extends StrictHeaderProps {
  /** Set Meta Content */
  meta?: ShorthandContent;
}
