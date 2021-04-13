import * as React from 'react';

import { useRxTable } from '../RxTable.context';

import AllRowsSelector from '../atoms/AllRowsSelector';
import ColumnHeader from '../atoms/ColumnHeader';


/* --------
 * Component Interfaces
 * -------- */
export interface HeaderRowProps {

}


/* --------
 * Component Definition
 * -------- */
const HeaderRow: React.FunctionComponent<HeaderRowProps> = () => {

  // ----
  // Get Context Props
  // ----
  const {
    classes,
    Components: {
      HeaderRow: HeaderRowComponent
    },
    columns,
    selection: {
      enabled: isDataSelectable
    },
    layout   : {
      hasFilterRow
    },
    styles
  } = useRxTable();


  // ----
  // Row Render
  // ----
  return (
    <HeaderRowComponent className={classes.HeaderRow} style={styles.HeaderRow}>
      {columns.current.map((column, index) => (
        <ColumnHeader
          key={column.key}
          className={isDataSelectable && index === 0 && !hasFilterRow ? 'selector' : undefined}
          column={column}
          isFilterHeader={false}
          overrideContent={
            isDataSelectable && index === 0 && !hasFilterRow
              ? (<AllRowsSelector key={column.key} />)
              : undefined
          }
        />
      ))}
    </HeaderRowComponent>
  );
};

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
