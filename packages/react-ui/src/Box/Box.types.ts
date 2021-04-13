import { FlexboxContent, Spacer, ShadowElevation } from '../generic';


export interface BoxProps extends FlexboxContent<StrictBoxProps> {

}

export interface StrictBoxProps {
  /** Set box shadow elevation */
  elevation?: ShadowElevation;

  /** Set all Margins */
  m?: Spacer;

  /** Set Margin Bottom */
  mb?: Spacer;

  /** Set Margin Left */
  ml?: Spacer;

  /** Set Margin Right */
  mr?: Spacer;

  /** Set Margin Top */
  mt?: Spacer;

  /** Set Margins on X Axe */
  mx?: Spacer;

  /** Set Margins on Y Axe */
  my?: Spacer;

  /** Set all Padding */
  p?: Spacer;

  /** Set Padding Bottom */
  pb?: Spacer;

  /** Set Padding Left */
  pl?: Spacer;

  /** Set Padding Right */
  pr?: Spacer;

  /** Set Padding Top */
  pt?: Spacer;

  /** Set Padding on X Axe */
  px?: Spacer;

  /** Set Padding on Y Axe */
  py?: Spacer;
}
