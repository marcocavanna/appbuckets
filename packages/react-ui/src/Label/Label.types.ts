import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps,
  MouseHandler
} from '../generic';

import { IconProps } from '../Icon';
import { ButtonProps } from '../Button';


export interface LabelProps extends UIMutableComponentProps<StrictLabelProps>, AppearanceProps {
}

export interface StrictLabelProps {
  /** Set the Disabled style */
  disabled?: boolean;

  /** Icon shorthand */
  icon?: AppBucketsIcon<IconProps>;

  /** On click Handler */
  onClick?: LabelClickHandler;

  /** On label remove handler */
  onRemove?: LabelRemoveHandler;

  /** Set the label as removable */
  removable?: boolean | ShorthandItem<ButtonProps>;
}

export type LabelClickHandler = MouseHandler<HTMLElement, LabelProps>;

export type LabelRemoveHandler = MouseHandler<HTMLButtonElement, LabelProps>;
