import {
  UIMutableComponentProps,
  AppBucketsIcon,
  AppearanceProps,
  MouseHandler
} from '../generic';

import { IconProps } from '../Icon';


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
  removable?: boolean | AppBucketsIcon<IconProps>;
}

export type LabelClickHandler = MouseHandler<HTMLElement, LabelProps>;

export type LabelRemoveHandler = MouseHandler<SVGSVGElement, LabelProps>;
