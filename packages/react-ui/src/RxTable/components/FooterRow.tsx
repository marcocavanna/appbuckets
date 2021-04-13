import * as React from 'react';

import { useRxTable } from '../RxTable.context';

import ColumnFooter from '../atoms/ColumnFooter';


/* --------
 * Component Interfaces
 * -------- */
export interface FooterRowProps {

}


/* --------
 * Component Definition
 * -------- */
const FooterRow: React.FunctionComponent<FooterRowProps> = () => {

  // ----
  // Get Context Props
  // ----
  const {
    classes,
    Components: {
      FooterRow: FooterRowComponent
    },
    columns,
    selection: {
      enabled: isDataSelectable
    },
    styles
  } = useRxTable();

  // ----
  // Footer Render
  // ----
  return (
    <FooterRowComponent className={classes.FooterRow} style={styles.FooterRow}>
      {columns.current.map((column, index) => (
        <ColumnFooter
          key={column.key}
          className={isDataSelectable && index === 0 ? 'selector' : undefined}
          column={column}
        />
      ))}
    </FooterRowComponent>
  );
};

FooterRow.displayName = 'FooterRow';

export default FooterRow;
