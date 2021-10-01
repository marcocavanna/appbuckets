import { ButterToastProps } from 'butter-toast';


export interface NotificationContainerProps extends ButterToastProps {
  /** Namespace is mandatory */
  namespace: string;
}
