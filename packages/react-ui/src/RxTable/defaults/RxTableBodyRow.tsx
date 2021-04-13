import * as React from 'react';

import TableRow from '../../Table/TableRow';

import { RxTableRowComponent } from '../RxTable.types';


/* --------
 * Component Definition
 * -------- */
const RxTableBodyRow: RxTableRowComponent<any> = (props) => {

  const {
    children,
    className,
    isVirtualized,
    onClick,
    style
  } = props;


  // ----
  // Component Render
  // ----
  return (
    <TableRow as={isVirtualized ? 'div' : 'tr'} className={className} style={style} onClick={onClick}>
      {children}
    </TableRow>
  );
};

RxTableBodyRow.displayName = 'RxTableBodyRow';

export default RxTableBodyRow;
