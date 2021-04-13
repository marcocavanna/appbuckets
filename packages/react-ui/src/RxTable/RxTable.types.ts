import * as React from 'react';

import {
  ContentAlign,
  ShorthandItem,
  AppBucketsComponentProps,
  AnyObject
} from '../generic';

import { LoaderProps } from '../Loader';
import { EmptyContentProps } from '../EmptyContent';

import { TableCellContentProps, TableCellProps, TableHeaderCellProps } from '../Table';

import { RxTableDataFilter } from './atoms/DataFilterElement';

import { UseRxTableFactoryConfig } from './RxTable.factory';


/* --------
 * RxTable Component
 * -------- */
export interface RxTableProps<Data> extends AppBucketsComponentProps<StrictRxTableProps<Data>, 'table'> {
}

export interface StrictRxTableProps<Data> extends Omit<UseRxTableFactoryConfig<Data>, 'width'> {
  /** An Element used to Render the Component */
  as?: string | React.ComponentClass | React.FunctionComponent;

  /** Children ar not permitted */
  children?: never;

  /** Components used to render the Table */
  Components?: Partial<RxTableComponents<Data>>;

  /** Compress Spacing between cells and rows */
  compressed?: boolean;

  /** Disable Header Render */
  disableHeader?: boolean;

  /** The row key or a function to get it */
  getRowKey: keyof Data | ((row: Data, index: number, array: Data[]) => React.Key);

  /** Initial Loading State */
  initiallyLoading?: boolean;

  /** Set default loader props, used with default loader component */
  loaderProps?: Partial<LoaderProps>;

  /** Set the maximum width */
  maximumWidth?: number;

  /** Set the minimum width */
  minimumWidth?: number;

  /** Set default empty content props, used with default empty component */
  noDataEmptyContentProps?: EmptyContentProps;

  /** Set default empty content props, used with default empty component */
  noFilteredDataEmptyContentProps?: EmptyContentProps;

  /** On Row Click Handler */
  onRowClick?: (row: Data, index: number, array: Data[]) => void;

  /** Select Column Props */
  selectColumnProps?: Partial<Pick<RxTableColumnProps<Data>, 'className' | 'headerClassName' | 'key' | 'textAlign'>>

  /** Wrapper Style */
  style?: React.CSSProperties;

  /** Set if must subtract some pixel from width */
  subtractToWidth?: number;

  /** Table Width */
  width?: number;
}


/* --------
 * RxTable Columns
 * -------- */

/** Cell Content Component */
export interface RxTableCellContentProps<Data> {
  /** Entire Column */
  column: RxTableColumnProps<Data>;

  /** Table data array */
  data: Data[];

  /** Row index */
  rowIndex: number;

  /** Cell Row Data */
  row: Data;
}

export type RxTableCellContent<Data> = React.FunctionComponent<RxTableCellContentProps<Data>>;

/** Cell content could be computed using function or shorthand */
export type ComputedCellContentField<Data> =
  | ((data: Data, index: number, array: Data[]) => ShorthandItem<TableCellContentProps>)
  | TableCellContentProps
  | React.ReactNode;

/** Single Column */
export interface RxTableColumnProps<Data> {
  /** Column Cell definition by object */
  cell?: {
    /** Main Content */
    content?: ComputedCellContentField<Data>;
    /** Cell Header */
    header?: ComputedCellContentField<Data>;
    /** Meta Content */
    meta?: ComputedCellContentField<Data>;
  };

  /** Set a component to render the cell content */
  Content?: RxTableCellContent<Data>;

  /** Children are not allowed */
  children?: never;

  /** User defined classes */
  className?: string;

  /** Filter data */
  filter?: RxTableDataFilter<Data>;

  /** Column Footer */
  footer?: TableCellProps | ((
    filteredData: Data[],
    selectedData: Data[],
    allData: Data[]
  ) => ShorthandItem<TableCellProps>) | React.ReactNode;

  /** Class name added to footer cell only */
  footerClassName?: string;

  /** The Column Grow factor, same as flex-grow properties when using auto sizing */
  growFactor?: number;

  /** Header content */
  header?: ShorthandItem<TableHeaderCellProps>;

  /** Class name added to header cell only */
  headerClassName?: string;

  /** Column Key */
  key: string;

  /** Inner content render */
  render?: (data: Data, index: number, array: Data[]) => React.ReactNode;

  /** Change Column Sorting */
  sort?: string[];

  /** Set text align */
  textAlign?: ContentAlign;

  /** The Column Width */
  width?: number | 'auto';

  /** Width calc type, when using auto, width will not be used any more */
  widthType?: 'fixed' | 'percentage';
}


/* --------
 * Side Components
 * -------- */

/**
 * HeaderCell
 * ---
 * This component is demanded to render
 * the column header cell.
 */
export interface RxTableHeaderCellProps {
  /** Header cell className */
  className: string;

  /** Header Content */
  content: ShorthandItem<TableHeaderCellProps>;

  /** Rendered Column */
  column: RxTableColumnProps<any>;

  /** Cell has Sorting */
  hasSorting: boolean;

  /** Column is actual sorted column */
  isActualSortingColumn: boolean;

  /** Column is sorting reversed */
  isReversedSorting: boolean;

  /** Column header is part of a virtualized table */
  isVirtualized: boolean;

  /** On Click Handler */
  onClick?: () => void;

  /** Mandatory Style to be Applied to set column width */
  style: React.CSSProperties;
}

export type RxTableHeaderCellComponent = React.ComponentType<RxTableHeaderCellProps & AnyObject>;


/**
 * FooterCell
 * ---
 * This component is demanded to render
 * the column header cell.
 */
export interface RxTableFooterCellProps {
  /** Header cell className */
  className: string;

  /** Rendered Column */
  column: RxTableColumnProps<any>;

  /** Column header is part of a virtualized table */
  isVirtualized: boolean;

  /** Mandatory Style to be Applied to set column width */
  style: React.CSSProperties;
}

export type RxTableFooterCellComponent = React.ComponentType<RxTableFooterCellProps & AnyObject>;


/**
 * Empty Content
 * ---
 * Render the Empty Content Text.
 * Filtered Data length, and All Data length
 * are passed to check if table has no data
 * or filtered data is empty
 */
export interface RxTableEmptyContentProps {
  /** User defined className */
  className: string | undefined;

  /** Table has data */
  hasData: boolean;

  /** Table has filtered data */
  hasFilteredData: boolean;

  /** User defined style */
  style: React.CSSProperties | undefined;
}

export type RxTableEmptyContentComponent = React.ComponentType<RxTableEmptyContentProps>;


/**
 * Row
 * ---
 * This component is demanded to render the
 * row that will contain each data cell
 */
export interface RxTableRowProps<Data> {
  /** Columns Array */
  children: React.ReactNode;

  /** Row className */
  className: string;

  /** Columns Array */
  columns: RxTableColumnProps<Data>[]

  /** Check if row is part of a virtualized table */
  isVirtualized: boolean;

  /** On row click handler */
  onClick?: () => void;

  /** The Row Data */
  row: Data;

  /** Row index */
  rowIndex: Number;

  /** Optional Style */
  style?: React.CSSProperties;
}

export type RxTableRowComponent<Data> = React.ComponentType<RxTableRowProps<Data> & AnyObject>;


/**
 * Cell
 * ---
 * This component is demanded to render the
 * single data cell
 */
export interface RxTableCellProps<Data> {
  /** Cell className */
  className: string;

  /** Column Properties */
  column: RxTableColumnProps<Data>;

  /** Check if cell is part of a virtualized table */
  isVirtualized: boolean;

  /** Single Row Data */
  row: Data;

  /** The Row Index */
  rowIndex: number;

  /** Mandatory Style to be Applied to set column width */
  style: React.CSSProperties;

  /** All data array */
  tableData: Data[];
}

export type RxTableCellComponent<Data> = React.ComponentType<RxTableCellProps<Data> & AnyObject>;


/* --------
 * Dynamic Definition of RxTable Components
 * -------- */
export interface RxTableComponents<Data> {
  /** Element used to Wrap the rows collection */
  Body: React.ElementType;

  /** Element used to render the single cell */
  BodyCell: RxTableCellComponent<Data>;

  /** Element used to render the row */
  BodyRow: RxTableRowComponent<Data>;

  /** Element used to wrap the entire list */
  BodyWrapper: React.ElementType;

  /** Element used to Wrap the header rows collection */
  Footer: React.ElementType;

  /** Element used to render the single header cell */
  FooterCell: RxTableFooterCellComponent;

  /** Element used to render the header row */
  FooterRow: React.ElementType;

  /** Element used to wrap the entire header elements */
  FooterWrapper: React.ElementType;

  /** Error Component */
  Error: React.ElementType;

  /** The Error Row Wrapper */
  ErrorRow: React.ElementType;

  /** The Error Cell */
  ErrorCell: React.ElementType;

  /** Element used to Wrap the header rows collection */
  Header: React.ElementType;

  /** Element used to render the single header cell */
  HeaderCell: RxTableHeaderCellComponent;

  /** Element used to render the header row */
  HeaderRow: React.ElementType;

  /** Element used to wrap the entire header elements */
  HeaderWrapper: React.ElementType;

  /** The Loader Element */
  Loader: React.ElementType;

  /** The Loader Row Wrapper */
  LoaderRow: React.ElementType;

  /** The Loader Row Cell */
  LoaderCell: React.ElementType;

  /** The No Content Element */
  NoContent: RxTableEmptyContentComponent;

  /** The No Content Cell */
  NoContentCell: React.ElementType;

  /** The No Content Row */
  NoContentRow: React.ElementType;
}
