import * as React from 'react';
import clsx from 'clsx';

import ColumnHeader from '../atoms/ColumnHeader';

import { useRxTable } from '../RxTable.context';

import AllRowsSelector from '../atoms/AllRowsSelector';
import DataFilterElement from '../atoms/DataFilterElement';


/* --------
 * Component Interfaces
 * -------- */
export interface FiltersRowProps {

}


/* --------
 * Component Definition
 * -------- */
const FiltersRow: React.FunctionComponent<FiltersRowProps> = () => {

  // ----
  // Get Context Props
  // ----
  const {
    classes,
    columns,
    Components: {
      HeaderRow: HeaderRowComponent
    },
    selection : {
      enabled: isDataSelectable
    },
    styles
  } = useRxTable();


  // ----
  // Build Classes
  // ----
  const rowClasses = clsx(classes.FilterRow || classes.HeaderRow, 'filter');


  // ----
  // Return Filter Row
  // ----
  return (
    <HeaderRowComponent
      className={rowClasses}
      style={styles.FilterRow || styles.HeaderRow}
    >
      {columns.current.map((column, index) => (
        <ColumnHeader
          key={column.key}
          className={isDataSelectable && index === 0 ? 'selector' : undefined}
          column={column}
          isFilterHeader={true}
          overrideContent={
            isDataSelectable && index === 0
              ? (<AllRowsSelector key={column.key} />)
              : (
                <DataFilterElement
                  columnKey={column.key}
                  filter={column.filter}
                />
              )
          }
        />
      ))}
    </HeaderRowComponent>
  );
};

FiltersRow.displayName = 'FiltersRow';

export default FiltersRow;
