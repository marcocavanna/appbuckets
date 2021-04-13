import * as React from 'react';
import clsx from 'clsx';

import { AnyObject } from '../generic';
import { useElementSize } from '../hooks/useElementSize';

import { useElementType } from '../utils';
import { useWithDefaultProps } from '../BucketTheme';

import { RxTableContext, RxTableProvider } from './RxTable.context';
import { useRxTableFactory } from './RxTable.factory';

import { RxTableComponents, RxTableProps } from './RxTable.types';

import Table from '../Table';

import BodyRow from './components/BodyRow';
import FiltersRow from './components/FiltersRow';
import FooterRow from './components/FooterRow';
import HeaderRow from './components/HeaderRow';
import StateDependentBodyRow from './components/StateDependentBodyRow';

import RxTableBodyCell from './defaults/RxTableBodyCell';
import RxTableBodyRow from './defaults/RxTableBodyRow';
import RxTableEmptyContent from './defaults/RxTableEmptyContent';
import RxTableFooterCell from './defaults/RxTableFooterCell';
import RxTableError from './defaults/RxTableError';
import RxTableHeaderCell from './defaults/RxTableHeaderCell';
import RxTableLoader from './defaults/RxTableLoader';


/* --------
 * Component Render
 * -------- */
const RxTable = <Data extends AnyObject>(
  receivedProps: React.PropsWithChildren<RxTableProps<Data>>
): React.FunctionComponentElement<RxTableProps<Data>> => {

  const props = useWithDefaultProps('rxTable', receivedProps);

  const {
    as,
    classes: userDefinedClasses,
    className,
    columns,
    Components: userDefinedComponents,
    compressed,
    data,
    defaultData,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedSelectedData,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    filterLogic,
    getRowKey: userDefinedGetRowKey,
    initiallyLoading,
    loaderProps,
    maximumWidth,
    minimumWidth,
    noFilteredDataEmptyContentProps,
    noDataEmptyContentProps,
    onRowClick,
    onSortChange,
    onSelectedDataChange,
    reloadDependency,
    reloadSilently,
    reverseSorting: userDefinedReverseSorting,
    selectable,
    selectColumnProps,
    sort: userDefinedSort,
    subtractToWidth,
    styles: userDefinedStyles,
    width : userDefinedWidth,
    ...rest
  } = props;


  // ----
  // Get the Right Element Type
  // ----
  const ElementType = useElementType<RxTableProps<Data>>(RxTable, receivedProps, props);


  // ----
  // Initialize the Width Detector
  // ----
  const [ widthDetector, { width } ] = useElementSize({
    useDetectorWidthOnly : true,
    useDetectorHeightOnly: true,
    fixedWidth           : userDefinedWidth,
    maximumWidth,
    minimumWidth,
    subtractToWidth
  });


  // ----
  // Load RxTableProps
  // ----
  const rxTableProps = useRxTableFactory<Data>({
    classes              : userDefinedClasses,
    columns,
    data,
    defaultData,
    defaultLoading       : initiallyLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedSelectedData,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    getRowKey            : userDefinedGetRowKey,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    selectable,
    selectColumnProps,
    sort                 : userDefinedSort,
    styles               : userDefinedStyles,
    width
  });


  // ----
  // Build Table ClassList
  // ----
  const classes = clsx(
    rxTableProps.layout.hasFilterRow && 'filterable',
    'rx-table',
    compressed && 'compressed',
    className
  );


  // ----
  // Define RxTable Components
  // ----
  const Components: RxTableComponents<Data> = {
    Body         : Table.Body,
    BodyCell     : RxTableBodyCell,
    BodyRow      : RxTableBodyRow,
    BodyWrapper  : React.Fragment,
    Error        : RxTableError,
    ErrorRow     : Table.Row,
    ErrorCell    : Table.Cell,
    Footer       : Table.Footer,
    FooterCell   : RxTableFooterCell,
    FooterRow    : Table.Row,
    FooterWrapper: React.Fragment,
    Header       : Table.Header,
    HeaderCell   : RxTableHeaderCell,
    HeaderRow    : Table.Row,
    HeaderWrapper: React.Fragment,
    Loader       : RxTableLoader,
    LoaderRow    : Table.Row,
    LoaderCell   : Table.Cell,
    NoContent    : RxTableEmptyContent,
    NoContentCell: Table.Cell,
    NoContentRow : Table.Row,
    ...userDefinedComponents
  };


  // ----
  // Context Building
  // ----
  const rxTableContext: RxTableContext<Data> = {
    ...rxTableProps,
    Components,
    loaderProps,
    noFilteredDataEmptyContentProps,
    noDataEmptyContentProps
  };


  // ----
  // Fragments could not have properties extra from key
  // ----
  const headerWrapperProps = Components.HeaderWrapper !== React.Fragment
    ? { className: rxTableProps.classes.HeaderWrapper, style: rxTableProps.styles.HeaderWrapper }
    : {};

  const bodyWrapperProps = Components.BodyWrapper !== React.Fragment
    ? { className: rxTableProps.classes.BodyWrapper, style: rxTableProps.styles.BodyWrapper }
    : {};

  const footerWrapperProps = Components.FooterWrapper !== React.Fragment
    ? { className: rxTableProps.classes.FooterWrapper, style: rxTableProps.styles.FooterWrapper }
    : {};


  // ----
  // Build the Component that will render Body Rows
  // ----
  const BodyRows = React.useCallback<React.FunctionComponent>(
    () => (
      <React.Fragment>
        {rxTableProps.tableData.map((row, index) => (
          <BodyRow
            key={rxTableProps.selection.getRowKey(row, index, rxTableProps.tableData)}
            index={index}
          />
        ))}
      </React.Fragment>
    ),
    [ rxTableProps.selection, rxTableProps.tableData ]
  );


  // ----
  // Component Render
  // ----
  return (
    <RxTableProvider value={rxTableContext}>
      {/* Width Detector Element */}
      {widthDetector}

      {/* Table Component */}
      <ElementType className={classes} {...rest}>

        {/* Table Header */}
        {(rxTableProps.layout.hasHeaderRow || rxTableProps.layout.hasFilterRow) && (
          <Components.HeaderWrapper {...headerWrapperProps}>
            <Components.Header style={rxTableProps.styles.Header} className={rxTableProps.classes.Header}>
              {/* Header Row Render */}
              {rxTableProps.layout.hasHeaderRow && !disableHeader && <HeaderRow />}
              {/* Filter Row Render */}
              {rxTableProps.layout.hasFilterRow && <FiltersRow />}
            </Components.Header>
          </Components.HeaderWrapper>
        )}

        {/* Table Body */}
        <Components.BodyWrapper {...bodyWrapperProps}>
          <Components.Body style={rxTableProps.styles.Body} className={rxTableProps.classes.Body}>
            <StateDependentBodyRow Content={BodyRows} />
          </Components.Body>
        </Components.BodyWrapper>

        {/* Table Footer */}
        {rxTableProps.layout.hasFooterRow && (
          <Components.FooterWrapper {...footerWrapperProps}>
            <Components.Footer style={rxTableProps.styles.Footer} className={rxTableProps.classes.Footer}>
              <FooterRow />
            </Components.Footer>
          </Components.FooterWrapper>
        )}

      </ElementType>
    </RxTableProvider>
  );
};

(RxTable as React.FunctionComponent<RxTableProps<any>>).displayName = 'RxTable';

(RxTable as React.FunctionComponent<RxTableProps<any>>).defaultProps = {
  as: Table
};

export default RxTable;
