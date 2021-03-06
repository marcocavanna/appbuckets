import { ShorthandItem, ShorthandContent } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps, AppBucketsIcon } from '../generic';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';


export interface EmptyContentProps extends UIMutableComponentProps<StrictEmptyContentProps> {

}

export interface StrictEmptyContentProps {
  /** Add an Action Button to Empty Content */
  button?: ShorthandItem<ButtonProps>;

  /** Set the Empty Content Header */
  header?: ShorthandContent;

  /** Set the Empty Content Icon */
  icon?: AppBucketsIcon<IconProps>;
}
