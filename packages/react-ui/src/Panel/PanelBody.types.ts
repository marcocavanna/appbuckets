import { ShorthandCollection } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps } from '../generic';
import { ButtonProps } from '../Button';


export interface PanelBodyProps extends UIMutableComponentProps<StrictPanelBodyProps> {
}

export interface StrictPanelBodyProps {
  /** Panel FAB Collections */
  fab?: ShorthandCollection<ButtonProps>;
}
