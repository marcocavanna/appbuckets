import { AppBucketsComponentProps, ShorthandCollection } from '../generic';
import { ButtonProps } from '../Button';


export interface PanelBodyProps extends AppBucketsComponentProps<StrictPanelBodyProps> {
}

export interface StrictPanelBodyProps {
  /** Panel FAB Collections */
  fab?: ShorthandCollection<ButtonProps>;
}
