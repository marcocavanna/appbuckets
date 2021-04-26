import { ShorthandItem } from '@appbuckets/react-ui-core';

import { UIMutableComponentProps, AppearanceProps } from '../generic';

import { PanelHeaderProps } from './PanelHeader.types';
import { PanelFooterProps } from './PanelFooter.types';
import { PanelBodyProps } from './PanelBody.types';


export interface PanelProps extends UIMutableComponentProps<StrictPanelProps>, AppearanceProps {

}

export interface StrictPanelProps extends Pick<PanelBodyProps, 'fab'> {
  /** Set disabled style */
  disabled?: boolean;

  /** Panel Footer Shorthand */
  footer?: ShorthandItem<PanelFooterProps>;

  /** Panel Header Shorthand */
  header?: ShorthandItem<PanelHeaderProps>;

  /** Place a Loader in front of Panel */
  loading?: boolean;

  /** Make the Panel completely solid */
  solid?: boolean;

  /** Set the Panel as table Container */
  table?: boolean;
}
