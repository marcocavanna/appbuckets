import { AccordionsProps } from '../Accordions';
import { AvatarProps } from '../Avatar';
import { AutoSpacerProps } from '../AutoSpacer';
import { BackdropInnerProps, BackdropProps } from '../Backdrop';
import { BadgeProps } from '../Badge';
import { BoxProps } from '../Box';
import { ButtonGroupProps, ButtonProps } from '../Button';
import { CheckboxProps } from '../Checkbox';
import { CollapsableProps } from '../Collapsable';
import { ColumnProps } from '../Column';
import { ColorPickerProps } from '../ColorPicker';
import { ContainerProps } from '../Container';
import { CircularProgressProps } from '../CircularProgress';
import { DayPickerProps } from '../DayPicker';
import { DividerProps } from '../Divider';
import { DropdownMenuProps } from '../DropdownMenu';
import { DropzoneProps } from '../Dropzone';
import { EmptyContentProps } from '../EmptyContent';
import { FadeProps } from '../Fade';
import { FormProps } from '../Form';
import { HeaderContentProps, HeaderProps, HeaderSubheaderProps } from '../Header';
import { HeroButtonProps } from '../HeroButton';
import { IconProps } from '../Icon';
import { InputProps } from '../Input';
import {
  ItemContentProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemMetaProps,
  ItemProps,
  ItemTextProps,
  ItemToolsProps
} from '../Item';
import { LabelProps, LabelGroupProps } from '../Label';
import { LinearProgressProps } from '../LinearProgress';
import { LoaderProps } from '../Loader';
import { MenuItemProps, MenuProps } from '../Menu';
import { MessageProps } from '../Message';
import { ModalActionsProps, ModalContentProps, ModalHeaderProps, ModalProps } from '../Modal';
import { MultiSelectProps } from '../MultiSelect';
import { NumericInputProps } from '../NumericInput';
import { PanelBodyProps, PanelFooterProps, PanelHeaderProps, PanelProps } from '../Panel';
import { PopupProps } from '../Popup';
import { RadioOptionProps, RadioProps } from '../Radio';
import { RowProps } from '../Row';
import { RxTableProps } from '../RxTable';
import { SectionProps } from '../Section';
import { SelectProps } from '../Select';
import { SliderProps } from '../Slider';
import { StickyProps } from '../Sticky';
import {
  TableBodyProps,
  TableCellContentProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderCellProps,
  TableHeaderProps,
  TableProps,
  TableRowProps
} from '../Table';
import { TabsProps, TabPanelProps } from '../Tabs';
import { ToastProps } from '../Toast';
import { VirtualizedTableProps } from '../VirtualizedTable';


/* --------
 * Bucket Theme Provider
 * -------- */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P]
};

type ThemeComponentProps<Props> = Partial<Props>;

export interface ThemeOptions {
  accordions: ThemeComponentProps<AccordionsProps>;

  avatar: ThemeComponentProps<AvatarProps>;

  autoSpacer: ThemeComponentProps<AutoSpacerProps>;

  backdrop: ThemeComponentProps<BackdropProps>;

  backdropInner: ThemeComponentProps<BackdropInnerProps>;

  badge: ThemeComponentProps<BadgeProps>;

  box: ThemeComponentProps<BoxProps>;

  button: ThemeComponentProps<ButtonProps>;

  buttonGroup: ThemeComponentProps<ButtonGroupProps>;

  checkbox: ThemeComponentProps<CheckboxProps>;

  circularProgress: ThemeComponentProps<CircularProgressProps>;

  collapsable: ThemeComponentProps<CollapsableProps>;

  colorPicker: ThemeComponentProps<ColorPickerProps>;

  column: ThemeComponentProps<ColumnProps>;

  container: ThemeComponentProps<ContainerProps>;

  dayPicker: ThemeComponentProps<DayPickerProps<any>>;

  divider: ThemeComponentProps<DividerProps>;

  dropdownMenu: ThemeComponentProps<DropdownMenuProps>;

  dropzone: ThemeComponentProps<DropzoneProps>;

  emptyContent: ThemeComponentProps<EmptyContentProps>;

  fade: ThemeComponentProps<FadeProps>;

  form: ThemeComponentProps<FormProps>;

  header: ThemeComponentProps<HeaderProps>;

  headerContent: ThemeComponentProps<HeaderContentProps>;

  headerSubheader: ThemeComponentProps<HeaderSubheaderProps>;

  heroButton: ThemeComponentProps<HeroButtonProps>;

  icon: ThemeComponentProps<IconProps>;

  input: ThemeComponentProps<InputProps>;

  item: ThemeComponentProps<ItemProps>;

  itemContent: ThemeComponentProps<ItemContentProps>;

  itemGroup: ThemeComponentProps<ItemGroupProps>;

  itemHeader: ThemeComponentProps<ItemHeaderProps>;

  itemMeta: ThemeComponentProps<ItemMetaProps>;

  itemText: ThemeComponentProps<ItemTextProps>;

  itemTools: ThemeComponentProps<ItemToolsProps>;

  label: ThemeComponentProps<LabelProps>;

  labelGroup: ThemeComponentProps<LabelGroupProps>;

  linearProgress: ThemeComponentProps<LinearProgressProps>;

  loader: ThemeComponentProps<LoaderProps>;

  menu: ThemeComponentProps<MenuProps>;

  menuItem: ThemeComponentProps<MenuItemProps>;

  message: ThemeComponentProps<MessageProps>;

  modal: ThemeComponentProps<ModalProps>;

  modalActions: ThemeComponentProps<ModalActionsProps>;

  modalContent: ThemeComponentProps<ModalContentProps>;

  modalHeader: ThemeComponentProps<ModalHeaderProps>;

  numericInput: ThemeComponentProps<NumericInputProps>;

  panel: ThemeComponentProps<PanelProps>;

  panelBody: ThemeComponentProps<PanelBodyProps>;

  panelFooter: ThemeComponentProps<PanelFooterProps>;

  panelHeader: ThemeComponentProps<PanelHeaderProps>;

  popup: ThemeComponentProps<PopupProps>;

  radio: ThemeComponentProps<RadioProps>;

  radioOption: ThemeComponentProps<RadioOptionProps>;

  row: ThemeComponentProps<RowProps>;

  rxTable: ThemeComponentProps<RxTableProps<any>>;

  section: ThemeComponentProps<SectionProps>;

  select: ThemeComponentProps<SelectProps<any, any, any>>;

  selectMulti: ThemeComponentProps<MultiSelectProps<any, any>>;

  slider: ThemeComponentProps<SliderProps>;

  sticky: ThemeComponentProps<StickyProps>;

  table: ThemeComponentProps<TableProps>;

  tableBody: ThemeComponentProps<TableBodyProps>;

  tableCell: ThemeComponentProps<TableCellProps>;

  tableCellContent: ThemeComponentProps<TableCellContentProps>;

  tableFooter: ThemeComponentProps<TableFooterProps>;

  tableHeader: ThemeComponentProps<TableHeaderProps>;

  tableHeaderCell: ThemeComponentProps<TableHeaderCellProps>;

  tableRow: ThemeComponentProps<TableRowProps>;

  tabPanel: ThemeComponentProps<TabPanelProps>;

  tabs: ThemeComponentProps<TabsProps>;

  toast: ThemeComponentProps<ToastProps>;

  virtualizedTable: ThemeComponentProps<VirtualizedTableProps<any>>;

}

export type PartialThemeOptions = RecursivePartial<ThemeOptions>;


/* --------
 * The Bucket Context will contain the theme object and some useful functions
 * -------- */
export interface BucketThemeContext {
  /** Theme configuration */
  theme: ThemeOptions;
}
