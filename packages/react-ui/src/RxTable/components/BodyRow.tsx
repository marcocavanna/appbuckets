import * as React from 'react';
import clsx from 'clsx';
import { useRxTable } from '../RxTable.context';

import Cell from '../atoms/Cell';
import SingleRowSelector from '../atoms/SingleRowSelector';


/* --------
 * Component Interfaces
 * -------- */
export interface BodyRowProps {
  /** The row index */
  index: number;

  /** Row Style */
  style?: React.CSSProperties;
}


/* --------
 * Component Definition
 * -------- */
const BodyRow: React.FunctionComponent<BodyRowProps> = (props) => {

  /** Extract row index from props */
  const { index, style } = props;


  // ----
  // Get Context Props
  // ----
  const {
    classes,
    columns,
    Components: {
      BodyRow: BodyRowComponent
    },
    layout    : {
      isVirtualized
    },
    tableData,
    interaction: {
      isRowClickEnabled,
      handleRowClick: superHandleRowClick
    },
    selection  : {
      enabled: isDataSelectable,
      isRowSelected
    },
    styles
  } = useRxTable();


  // ----
  // Extract Data from Array
  // ----
  const row = tableData[index];


  // ----
  // Build Default row Class
  // ----
  const bodyRowClasses = clsx({
    last     : index === tableData.length - 1,
    first    : index === 0,
    clickable: isRowClickEnabled,
    selected : isRowSelected(row)
  }, classes.BodyRow);


  // ----
  // Handlers
  // ----
  const handleRowClick = React.useCallback(
    () => {
      superHandleRowClick(index);
    },
    [ superHandleRowClick, index ]
  );


  // ----
  // Render the Row
  // ----
  return (
    <BodyRowComponent
      className={bodyRowClasses}
      columns={columns.current}
      onClick={isRowClickEnabled ? handleRowClick : undefined}
      isVirtualized={isVirtualized}
      rowIndex={index}
      row={row}
      style={{ ...style, ...styles.BodyRow }}
    >
      {columns.current.map((column, columnIndex) => (
        <Cell
          key={column.key}
          className={isDataSelectable && columnIndex === 0 ? 'selector' : undefined}
          column={column}
          row={row}
          rowIndex={index}
          overrideContent={
            isDataSelectable && columnIndex === 0
              ? <SingleRowSelector row={row} />
              : undefined
          }
        />
      ))}
    </BodyRowComponent>
  );
};

BodyRow.displayName = 'BodyRow';

export default BodyRow;
