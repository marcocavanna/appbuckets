import { AccordionsProps } from '../Accordions';
import { ColumnProps } from '../Column';
import { ContainerProps } from '../Container';
import { CircularProgressProps } from '../CircularProgress';
import { DropdownMenuProps } from '../DropdownMenu';
import { MultiSelectProps } from '../MultiSelect';
import { FormFormikProps, FormProps } from '../Form';
import { RowProps } from '../Row';
import { MenuItemProps, MenuProps } from '../Menu';
import { MessageProps } from '../Message';
import { RxTableProps } from '../RxTable';
import {
  TableBodyProps,
  TableCellContentProps,
  TableCellProps,
  TableFooterProps, TableHeaderCellProps, TableHeaderProps,
  TableProps, TableRowProps
} from '../Table';
import { TabsProps } from '../Tabs';
import { TabPanelProps } from '../Tabs/TabPanel.types';
import { AvatarProps } from '../Avatar';
import { BadgeProps } from '../Badge';
import { BoxProps } from '../Box';
import { ButtonGroupProps, ButtonProps } from '../Button';
import { CheckboxProps } from '../Checkbox';
import { ColorPickerProps } from '../ColorPicker';
import { DayPickerProps } from '../DayPicker';
import { DividerProps } from '../Divider';
import { EmptyContentProps } from '../EmptyContent';
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
  ItemTextProps, ItemToolsProps
} from '../Item';
import { LabelProps } from '../Label';
import { LabelGroupProps } from '../Label/LabelGroup.types';
import { LoaderProps } from '../Loader';
import { NumericInputProps } from '../NumericInput';
import { PanelBodyProps, PanelFooterProps, PanelHeaderProps, PanelProps } from '../Panel';
import { LinearProgressProps } from '../LinearProgress';
import { SectionProps } from '../Section';
import { SelectProps } from '../Select';
import { ToastProps } from '../Toast';
import { AutoSpacerProps } from '../AutoSpacer';
import { BackdropInnerProps, BackdropProps } from '../Backdrop';
import { CollapsableProps } from '../Collapsable';
import { DropzoneProps } from '../Dropzone';
import { ModalActionsProps, ModalContentProps, ModalHeaderProps, ModalProps } from '../Modal';
import { PopupProps } from '../Popup';
import { StickyProps } from '../Sticky';
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

  form: ThemeComponentProps<FormProps>;

  formFormik: ThemeComponentProps<FormFormikProps<any>>;

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

  row: ThemeComponentProps<RowProps>;

  rxTable: ThemeComponentProps<RxTableProps<any>>;

  section: ThemeComponentProps<SectionProps>;

  select: ThemeComponentProps<SelectProps<any, any, any>>;

  selectMulti: ThemeComponentProps<MultiSelectProps<any, any>>;

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
