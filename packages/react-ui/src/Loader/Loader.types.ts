import { AppBucketsComponentProps, SharedComponentStateProps } from '../generic';


export type LoaderType = 'circular' | 'dots' | 'circular dots' | 'indeterminate bar';


export interface LoaderProps extends AppBucketsComponentProps<StrictLoaderProps>, SharedComponentStateProps {
}

export interface StrictLoaderProps {
  /** Show Loader */
  active?: boolean;

  /** Center the Loader Horizontally */
  centered?: boolean;

  /** Set the Loader as inline */
  inline?: boolean;

  /** Invert Loader color */
  inverted?: boolean;

  /** Set the Loader as an Overlay, will be absolute placed on parents */
  overlay?: boolean;

  /** Set the loader type */
  type?: LoaderType;
}
