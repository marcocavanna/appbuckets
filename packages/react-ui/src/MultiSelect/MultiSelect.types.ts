import { SelectOption, SelectDefaultOption, SelectProps, SelectEventProps } from '../Select';


export interface MultiSelectProps<Option extends SelectOption = SelectDefaultOption, Value = string | number>
  extends SelectProps<Option, Value[], []> {
}


export type MultiSelectEventProps<Option extends SelectOption = SelectDefaultOption, Value = string | number> =
  SelectEventProps<Option, Value[], []>;
