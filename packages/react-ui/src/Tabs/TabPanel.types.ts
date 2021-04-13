import {
  AppBucketsComponentProps
} from '../generic';


export interface TabPanelProps extends AppBucketsComponentProps<StrictTabPanelProps> {
}

export interface StrictTabPanelProps {
  /** Set if tab is active */
  active?: boolean;
}
