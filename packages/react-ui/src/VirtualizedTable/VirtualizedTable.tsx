import * as React from 'react';
import clsx from 'clsx';

import { VariableSizeList, ListItemKeySelector, areEqual, ListOnScrollProps } from 'react-window';

import { AnyObject } from '../generic';
import { useElementSize } from '../hooks/useElementSize';

import { useWithDefaultProps } from '../BucketTheme';

import { RxTableComponents, RxTableContext, useRxTable, useRxTableFactory } from '../RxTable';
import { RxTableProvider } from '../RxTable/RxTable.context';

import BodyRow from '../RxTable/components/BodyRow';
import FooterRow from '../RxTable/components/FooterRow';
import FiltersRow from '../RxTable/components/FiltersRow';
import HeaderRow from '../RxTable/components/HeaderRow';
import StateDependentBodyRow from '../RxTable/components/StateDependentBodyRow';

import RxTableBodyCell from '../RxTable/defaults/RxTableBodyCell';
import RxTableBodyRow from '../RxTable/defaults/RxTableBodyRow';
import RxTableFooterCell from '../RxTable/defaults/RxTableFooterCell';
import RxTableHeaderCell from '../RxTable/defaults/RxTableHeaderCell';
import RxTableEmptyContent from '../RxTable/defaults/RxTableEmptyContent';
import RxTableError from '../RxTable/defaults/RxTableError';
import RxTableLoader from '../RxTable/defaults/RxTableLoader';

import ScrollOnTop from './atoms/ScrollOnTop';

import { VirtualizedTableProps } from './VirtualizedTable.types';


/* --------
 * Memoize the BodyRow Component to be used with VariableSizeList
 * -------- */
const MemoizedBodyRow = React.memo(BodyRow, areEqual);


/* --------
 * Variable Size List Inner Element
 * ---
 * Is extracted from original code to avoid
 * list rerender
 * -------- */
const VariableSizeListInnerElement = React.forwardRef<HTMLElement, AnyObject>((
  props, ref
) => {

  /** Get Body Component */
  const {
    Components: { Body },
    classes,
    styles
  } = useRxTable();

  /** Extract style and classes from props */
  const {
    style,
    className,
    ...rest
  } = props;

  /** Merge Body Classes */
  const bodyClasses = clsx(className, classes.Body);

  /** Render the Component */
  return (
    <Body
      {...rest}
      ref={ref}
      className={bodyClasses}
      style={{
        ...styles.Body,
        ...style
      }}
    />
  );
});


/* --------
 * Variable Size List Outer Element
 * ---
 * Is extracted from original code to avoid
 * list rerender
 * -------- */
const VariableSizeListOuterElement = React.forwardRef<HTMLElement, AnyObject>((
  props, ref
) => {

  /** Get Body Component */
  const {
    Components: { BodyWrapper },
    classes,
    styles
  } = useRxTable();

  /** Extract style and classes from props */
  const {
    style,
    className,
    ...rest
  } = props;

  /** Merge Body Classes */
  const bodyWrapperClasses = clsx(className, classes.BodyWrapper);

  /** Render the Component */
  return (
    <BodyWrapper
      {...rest}
      ref={ref}
      className={bodyWrapperClasses}
      style={{
        ...styles.BodyWrapper,
        ...style
      }}
    />
  );
});


/* --------
 * Component Definition
 * -------- */
const VirtualizedTable = <Data extends AnyObject>(
  receivedProps: React.PropsWithChildren<VirtualizedTableProps<Data>>
): React.FunctionComponentElement<VirtualizedTableProps<Data>> => {

  const props = useWithDefaultProps('virtualizedTable', receivedProps);

  const {
    /** RxTable Shared Props */
    classes: userDefinedClasses,
    className,
    columns,
    Components: userDefinedComponents,
    data,
    defaultData,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedSelectedData,
    defaultSort          : userDefinedDefaultSort,
    disableHeader,
    filterLogic,
    getRowKey: userDefinedGetRowKey,
    height   : userDefinedHeight,
    initiallyLoading,
    loaderProps,
    noFilteredDataEmptyContentProps,
    noDataEmptyContentProps,
    onRowClick,
    onSortChange,
    onSelectedDataChange,
    reloadDependency,
    reloadSilently,
    reverseSorting: userDefinedReverseSorting,
    scrollOnTopButtonProps,
    scrollOnTopOffsetVisibility,
    selectable,
    selectColumnProps,
    sort: userDefinedSort,
    style,
    styles: userDefinedStyles,
    width : userDefinedWidth,
    useScrollOnTop,

    /** Dedicated VirtualizedTable Props */
    compressed,
    filterRowHeight: userDefinedFilterRowHeight,
    footerRowHeight: userDefinedFooterRowHeight,
    headerHeight   : userDefinedHeaderHeight,
    rowHeight,

    /** Size Detector Props */
    maximumWidth,
    maximumHeight,
    minimumWidth,
    minimumHeight,
    subtractToWidth,
    subtractToHeight,

    /** Extracted Variable Size List Props */
    direction,
    itemKey,
    overscanCount,
    onItemsRendered,
    onScroll: userDefinedOnScroll,
    useIsScrolling,

    ...rest
  } = props;


  // ----
  // Initialize the VariableSizeList ref to use ScrollOnTop
  // ----
  const variableSizeListRef = React.useRef<VariableSizeList>(null);


  // ----
  // Use an internal State to Show/Hide ScrollOnTop Component
  // ----
  const [ scrollOnTopVisible, setScrollOnTopVisible ] = React.useState<boolean>(false);


  // ----
  // Checker Builder
  // ----
  const hasFilterRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.filter),
    [ columns ]
  );

  const hasFooterRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.footer),
    [ columns ]
  );

  const hasHeaderRow = React.useMemo<boolean>(
    () => columns.some((column) => !!column.header),
    [ columns ]
  );


  // ----
  // Initialize the Width Detector
  // ----
  const [ widthDetector, { width, height } ] = useElementSize({
    useDetectorWidthOnly: true,
    fixedHeight         : userDefinedHeight,
    fixedWidth          : userDefinedWidth,
    maximumWidth,
    maximumHeight,
    minimumWidth,
    minimumHeight,
    subtractToWidth,
    subtractToHeight
  });

  const headerHeight = React.useMemo<number>(
    () => {
      /** If table has not header row, return 0 */
      if (!hasHeaderRow) {
        return 0;
      }

      const baseHeaderHeight = typeof userDefinedHeaderHeight === 'number'
        ? userDefinedHeaderHeight
        : typeof rowHeight === 'number'
          ? rowHeight
          : 0;

      /** If table is not selectable, return the base height */
      if (!selectable || hasFilterRow) {
        return baseHeaderHeight;
      }

      return Math.max(40, baseHeaderHeight);
    },
    [ hasFilterRow, hasHeaderRow, rowHeight, selectable, userDefinedHeaderHeight ]
  );

  const filterRowHeight: number = hasFilterRow
    ? typeof userDefinedFilterRowHeight === 'number'
      ? userDefinedFilterRowHeight
      : headerHeight
    : 0;

  const footerRowHeight: number = hasFooterRow
    ? typeof userDefinedFooterRowHeight === 'number'
      ? userDefinedFooterRowHeight
      : headerHeight
    : 0;


  // ----
  // Load RxTableProps
  // ----
  const rxTableProps = useRxTableFactory<Data>({
    classes              : {
      Body         : clsx(
        'virtualized body',
        userDefinedClasses?.Body
      ),
      BodyCell     : clsx(
        'virtualized cell',
        userDefinedClasses?.BodyCell
      ),
      BodyRow      : clsx(
        'virtualized row',
        userDefinedClasses?.BodyRow
      ),
      BodyWrapper  : clsx(
        'virtualized table virtualized-body',
        userDefinedClasses?.BodyWrapper
      ),
      ErrorCell    : clsx(
        'cell error-cell',
        userDefinedClasses?.ErrorCell
      ),
      ErrorRow     : clsx(
        'row error-row',
        userDefinedClasses?.ErrorRow
      ),
      Footer       : clsx(
        'virtualized foot',
        userDefinedClasses?.Footer
      ),
      FooterRow    : clsx(
        'virtualized row',
        userDefinedClasses?.FooterRow
      ),
      FooterWrapper: clsx(
        'virtualized table virtualized-foot',
        userDefinedClasses?.FooterWrapper
      ),
      Header       : clsx(
        'virtualized head',
        userDefinedClasses?.Header
      ),
      HeaderRow    : clsx(
        'virtualized row',
        userDefinedClasses?.HeaderRow
      ),
      HeaderWrapper: clsx(
        'virtualized table virtualized-head',
        userDefinedClasses?.HeaderWrapper
      ),
      LoaderCell   : clsx(
        'cell loading-cell',
        userDefinedClasses?.LoaderCell
      ),
      LoaderRow    : clsx(
        'row loading-row',
        userDefinedClasses?.LoaderRow
      ),
      NoContentCell: clsx(
        'cell no-content-cell',
        userDefinedClasses?.NoContentCell
      ),
      NoContentRow : clsx(
        'row no-content-row',
        userDefinedClasses?.NoContentRow
      ),
      ...userDefinedClasses
    },
    styles               : {
      HeaderCell: {
        height: headerHeight,
        ...userDefinedStyles?.HeaderCell
      },
      FilterCell: {
        height: filterRowHeight,
        ...userDefinedStyles?.FilterCell
      },
      FooterCell: {
        height: footerRowHeight,
        ...userDefinedStyles?.FooterCell
      },
      ...userDefinedStyles
    },
    columns,
    data,
    defaultData,
    defaultLoading       : initiallyLoading,
    defaultReverseSorting: userDefinedDefaultReverseSorting,
    defaultSelectedData  : userDefinedSelectedData,
    defaultSort          : userDefinedDefaultSort,
    filterLogic,
    getRowKey            : userDefinedGetRowKey,
    isVirtualized        : true,
    onRowClick,
    onSelectedDataChange,
    onSortChange,
    reloadDependency,
    reloadSilently,
    reverseSorting       : userDefinedReverseSorting,
    selectable,
    selectColumnProps,
    sort                 : userDefinedSort,
    width
  });


  // ----
  // Row Height Calculator
  // ----
  const estimatedItemSize = typeof rowHeight === 'number' ? rowHeight : undefined;

  const getRowHeight = React.useCallback(
    (index: number): number => {
      if (typeof rowHeight === 'number') {
        return rowHeight;
      }

      return rowHeight(index);
    },
    [ rowHeight ]
  );


  // ----
  // Compute Table Width and Height and Accessor
  // ----
  const tableBodyHeight = height - (!disableHeader ? headerHeight : 0) - filterRowHeight - footerRowHeight;
  const tableDataHeight = typeof rowHeight === 'number'
    ? rxTableProps.tableData.length * rowHeight
    : typeof estimatedItemSize === 'number'
      ? rxTableProps.tableData.length * estimatedItemSize
      : Number.MAX_SAFE_INTEGER;

  const effectiveBodyHeight = Math.max(0, Math.min(tableBodyHeight, tableDataHeight));
  const effectiveTableHeight = effectiveBodyHeight + (!disableHeader
    ? headerHeight
    : 0) + filterRowHeight + footerRowHeight;


  // ----
  // Row Key Getter
  // ----
  const getRowKey = React.useCallback<ListItemKeySelector>(
    (index) => {
      /** If an itemKey function exists, use it */
      if (typeof itemKey === 'function') {
        return itemKey(index, rxTableProps.tableData);
      }

      /** Use the data selector function */
      const extractedKey = rxTableProps.selection.getRowKey(
        rxTableProps.tableData[index],
        index,
        rxTableProps.tableData
      );

      return extractedKey === '' ? index : extractedKey;
    },
    [ itemKey, rxTableProps.selection, rxTableProps.tableData ]
  );


  // ----
  // Define Components
  // ----
  const Components: RxTableComponents<Data> = React.useMemo(
    () => ({
      Body         : 'div',
      BodyCell     : RxTableBodyCell,
      BodyRow      : RxTableBodyRow,
      BodyWrapper  : 'div',
      Error        : RxTableError,
      ErrorRow     : 'div',
      ErrorCell    : 'div',
      Footer       : 'div',
      FooterCell   : RxTableFooterCell,
      FooterRow    : 'div',
      FooterWrapper: 'div',
      Header       : 'div',
      HeaderCell   : RxTableHeaderCell,
      HeaderRow    : 'div',
      HeaderWrapper: 'div',
      Loader       : RxTableLoader,
      LoaderRow    : 'div',
      LoaderCell   : 'div',
      NoContent    : RxTableEmptyContent,
      NoContentCell: 'div',
      NoContentRow : 'div',
      ...userDefinedComponents
    }),
    [ userDefinedComponents ]
  );


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

  const footerWrapperProps = Components.FooterWrapper !== React.Fragment
    ? { className: rxTableProps.classes.FooterWrapper, style: rxTableProps.styles.FooterWrapper }
    : {};


  // ----
  // Build a custom onScroll handler to show/hide ScrollOnTop component
  // ----
  const handleTableScroll = React.useCallback(
    (scrollProps: ListOnScrollProps) => {
      /** If must use the OnScroll Component, check if this must be visible or invisible */
      if (useScrollOnTop && effectiveBodyHeight > 0) {
        /** Get the offset */
        const offset = scrollOnTopOffsetVisibility || effectiveBodyHeight * 2;

        /** Update only if is necessary */
        if (scrollOnTopVisible !== scrollProps.scrollOffset > offset) {
          setScrollOnTopVisible(scrollProps.scrollOffset > offset);
        }
      }

      /** If a userDefinedOnScroll function exists, use it */
      if (typeof userDefinedOnScroll === 'function') {
        userDefinedOnScroll(scrollProps);
      }
    },
    [
      userDefinedOnScroll,
      useScrollOnTop,
      scrollOnTopOffsetVisibility,
      effectiveBodyHeight,
      scrollOnTopVisible
    ]
  );

  const handleScrollOnTopClick = React.useCallback(
    () => {
      /** Scroll the list on top */
      if (variableSizeListRef.current) {
        variableSizeListRef.current.scrollTo(0);
      }
    },
    []
  );


  // ----
  // Wrap the StateDependentRow to avoid multiple Body and BodyWrapper component nest
  // ----
  const isShowingData = !(rxTableProps.dataState.isLoading || rxTableProps.dataState.error || !rxTableProps.tableData.length);

  const {
    BodyWrapper,
    Body
  } = Components;

  const tableBodyContent = React.useMemo(
    () => {
      if (!isShowingData) {
        const bodyWrapperProps = BodyWrapper !== React.Fragment
          ? { className: rxTableProps.classes.BodyWrapper, style: rxTableProps.styles.BodyWrapper }
          : {};

        return (
          <BodyWrapper {...bodyWrapperProps}>
            <Body style={rxTableProps.styles.Body} className={rxTableProps.classes.Body}>
              <StateDependentBodyRow />
            </Body>
          </BodyWrapper>
        );
      }

      return (
        <VariableSizeList
          ref={variableSizeListRef}
          direction={direction}
          itemKey={getRowKey}
          overscanCount={overscanCount}
          onItemsRendered={onItemsRendered}
          onScroll={(useScrollOnTop || typeof userDefinedOnScroll === 'function') ? handleTableScroll : undefined}
          useIsScrolling={useIsScrolling}
          width={rxTableProps.layout.effectiveTableWidth}
          height={effectiveBodyHeight}
          itemSize={getRowHeight}
          estimatedItemSize={estimatedItemSize}
          itemCount={rxTableProps.tableData.length}
          outerElementType={VariableSizeListOuterElement}
          innerElementType={VariableSizeListInnerElement}
        >
          {MemoizedBodyRow}
        </VariableSizeList>
      );
    },
    [
      isShowingData,
      direction,
      getRowKey,
      overscanCount,
      onItemsRendered,
      useScrollOnTop,
      userDefinedOnScroll,
      handleTableScroll,
      useIsScrolling,
      rxTableProps.layout.effectiveTableWidth,
      rxTableProps.tableData.length,
      rxTableProps.classes.BodyWrapper,
      rxTableProps.classes.Body,
      rxTableProps.styles.BodyWrapper,
      rxTableProps.styles.Body,
      effectiveBodyHeight,
      getRowHeight,
      estimatedItemSize,
      Body,
      BodyWrapper
    ]
  );


  // ----
  // Build Table ClassList
  // ----
  const wrapperClasses = clsx(
    'virtualized-table',
    compressed && 'compressed'
  );


  // ----
  // Build Wrapper Style
  // ----
  const wrapperStyle = React.useMemo<React.CSSProperties>(
    () => (isShowingData ? {
      height   : `${effectiveTableHeight}px`,
      width    : `${width}px`,
      overflow : 'auto',
      maxHeight: '100vh',
      minHeight: `${(!disableHeader ? headerHeight : 0) + filterRowHeight}px`,
      ...style
    } : { ...style }),
    [ effectiveTableHeight, width, style, isShowingData, disableHeader, headerHeight, filterRowHeight ]
  );


  // ----
  // Component Render
  // ----
  return (
    <React.Fragment>
      {/* Width Detector Element */}
      {widthDetector}

      <div
        {...rest}
        className={wrapperClasses}
        style={wrapperStyle}
      >

        <RxTableProvider value={rxTableContext}>

          {/* Table Header */}
          {(rxTableProps.layout.hasHeaderRow || rxTableProps.layout.hasFilterRow) && (
            <Components.HeaderWrapper {...headerWrapperProps}>
              <Components.Header className={rxTableProps.classes.Header} style={rxTableProps.styles.Header}>
                {/* Header Row Render */}
                {rxTableProps.layout.hasHeaderRow && <HeaderRow />}
                {/* Filter Row Render */}
                {rxTableProps.layout.hasFilterRow && <FiltersRow />}
              </Components.Header>
            </Components.HeaderWrapper>
          )}

          {/* Table Body */}
          {tableBodyContent}

          {/* Table Footer */}
          {rxTableProps.layout.hasFooterRow && (
            <Components.FooterWrapper {...footerWrapperProps}>
              <Components.Footer style={rxTableProps.styles.Footer} className={rxTableProps.classes.Footer}>
                <FooterRow />
              </Components.Footer>
            </Components.FooterWrapper>
          )}

          {/* ScrollOnTop Component */}
          {useScrollOnTop && (
            <ScrollOnTop
              {...scrollOnTopButtonProps}
              visible={scrollOnTopVisible}
              onClick={handleScrollOnTopClick}
            />
          )}

        </RxTableProvider>
      </div>
    </React.Fragment>
  );
};

VirtualizedTable.displayName = 'VirtualizedTable';

export default VirtualizedTable;
