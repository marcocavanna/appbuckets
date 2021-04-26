import { Merge, UIVoidComponentProps } from '../generic';

import { StrictFieldProps } from '../Field';
import { StrictItemProps } from '../Item';


export interface ColorPickerProps extends UIVoidComponentProps<Merge<StrictColorPickerProps, StrictItemProps>> {
}

export interface StrictColorPickerProps extends StrictFieldProps {
  /** Manually control Color */
  color?: string | null;

  /** Color available */
  colors?: string[];

  /** Set initial Color */
  defaultColor?: string;

  /** Set default Open State for Picker Popup */
  defaultOpen?: boolean;

  /** Disable the Picker */
  disabled?: boolean;

  /** On Change Color event Handler */
  onChange?: (nothing: null, props: ColorPickerProps) => void;

  /** Handler for Picker Close event */
  onPickerClose?: () => void;

  /** Handler for Picker Open event */
  onPickerOpen?: () => void;

  /** Manually control Open State for Picker Popup */
  open?: boolean;

  /** Set the Picker Type */
  pickerType?: 'block' | 'twitter' | 'circle';

  /** Placeholder */
  placeholder?: string;

  /** Show the Color Value */
  showColorValue?: boolean;
}
