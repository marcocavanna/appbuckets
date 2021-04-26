import { ShorthandItem } from '@appbuckets/react-ui-core';

import {
  UIMutableVoidComponentProps,
  AppBucketsIcon
} from '../generic';

import { IconProps } from '../Icon';
import { HeaderProps } from '../Header';

import { CollapsableProps } from '../Collapsable';


export interface AccordionSection extends Omit<CollapsableProps, 'trigger'> {
  trigger?: ShorthandItem<HeaderProps>;
}

export interface AccordionsProps extends UIMutableVoidComponentProps<StrictAccordionsProps> {
}

export interface StrictAccordionsProps {
  /** Set the tab active index */
  activeIndexes?: number[];

  /** Allow Multiple Opening */
  allowMultiple?: boolean;

  /** Set the default active index */
  defaultActiveIndexes?: number[];

  /** Set Trigger Icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Icon Rotation while Active */
  iconRotation?: number;

  /** On Section Change Shorthand */
  onSectionChange?: (action: 'open' | 'close', props: AccordionsProps) => void;

  /** On Section Close Event */
  onSectionClose?: (nothing: null, props: AccordionsProps) => void;

  /** On Section Open Event */
  onSectionOpen?: (nothing: null, props: AccordionsProps) => void;

  /** Accordion Sections */
  sections?: AccordionSection[];
}
