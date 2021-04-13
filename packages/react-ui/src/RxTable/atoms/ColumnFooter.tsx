import clsx from 'clsx';
import * as React from 'react';

import { useRxTable } from '../RxTable.context';

import { RxTableColumnProps } from '../RxTable.types';


/* --------
 * Component Interfaces
 * -------- */
export interface ColumnFooterProps {
  /** Additional ClassName */
  className?: string;

  /** The column object */
  column: RxTableColumnProps<unknown>;
}


/* --------
 * Component Definition
 * -------- */
const ColumnFooter: React.FunctionComponent<ColumnFooterProps> = (props) => {

  const {
    className,
    column
  } = props;


  // ----
  // Get Context Data
  // ----
  const {
    classes,
    Components: {
      FooterCell
    },
    columns   : {
      getWidth: getColumnWidth
    },
    layout    : { isVirtualized },
    styles
  } = useRxTable();


  // ----
  // Build Footer Classes
  // ----
  const footerClasses = clsx(
    column.textAlign && `has-text-${column.textAlign}`,
    className,
    column.footerClassName,
    classes.FooterCell
  );


  // ----
  // Get Column Width
  // ----
  const columnWidth = React.useMemo(
    () => getColumnWidth(column.key),
    [ getColumnWidth, column.key ]
  );


  // ----
  // Render the Component
  // ----
  return (
    <FooterCell
      className={footerClasses}
      column={column}
      isVirtualized={isVirtualized}
      style={{
        ...styles.FooterCell,
        flexBasis: columnWidth,
        width    : columnWidth
      }}
    />
  );
};

ColumnFooter.displayName = 'ColumnFooter';

export default ColumnFooter;
