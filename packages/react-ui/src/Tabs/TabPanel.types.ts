import { UIMutableComponentProps } from '../generic';


export interface TabPanelProps extends UIMutableComponentProps<StrictTabPanelProps> {
}

export interface StrictTabPanelProps {
  /** Set if tab is active */
  active?: boolean;
}
