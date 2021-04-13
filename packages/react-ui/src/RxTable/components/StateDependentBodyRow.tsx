import * as React from 'react';
import clsx from 'clsx';

import { useRxTable } from '../RxTable.context';


/* --------
 * Component Interfaces
 * -------- */
export interface StateDependentBodyRowProps {
  /** The Content to Render as Body Row */
  Content?: React.ComponentType;
}


/* --------
 * Component Definition
 * -------- */
const StateDependentBodyRow: React.FunctionComponent<StateDependentBodyRowProps> = (
  props
) => {

  const { Content } = props;


  // ----
  // Get Context Props
  // ----
  const {
    classes,
    Components,
    columns,
    data,
    dataState,
    tableData,
    styles
  } = useRxTable();


  // ----
  // Row Render while Data is still Loading
  // ----
  if (dataState.isLoading) {
    return (
      <Components.LoaderRow className={clsx('loading-row', classes.LoaderRow)} style={styles.LoaderRow}>
        <Components.LoaderCell
          colSpan={columns.current.length}
          className={clsx('loading-cell', classes.LoaderCell)}
          style={styles.LoaderCell}
        >
          <Components.Loader className={classes.Loader} style={styles.Loader} />
        </Components.LoaderCell>
      </Components.LoaderRow>
    );
  }


  // ----
  // Row Render while Data Load produce an Error
  // ----
  if (dataState.error) {
    return (
      <Components.ErrorRow className={clsx('error-row', classes.ErrorRow)} style={styles.ErrorRow}>
        <Components.ErrorCell
          colSpan={columns.current.length}
          className={clsx('error-cell', classes.ErrorCell)}
          style={styles.ErrorCell}
        >
          <Components.Error className={classes.Error} style={styles.Error} />
        </Components.ErrorCell>
      </Components.ErrorRow>
    );
  }


  // ----
  // Row Render while no Data is being able to be show
  // ----
  if (!tableData.length) {
    return (
      <Components.NoContentRow className={clsx('no-content-row', classes.NoContentRow)} style={styles.NoContentCell}>
        <Components.NoContentCell
          colSpan={columns.current.length}
          className={clsx('no-content-cell', classes.NoContentCell)}
          style={styles.NoContentCell}
        >
          <Components.NoContent
            className={classes.NoContent}
            hasData={!!data.length}
            hasFilteredData={!!tableData.length}
            style={styles.NoContent}
          />
        </Components.NoContentCell>
      </Components.NoContentRow>
    );
  }


  // ----
  // Render Default Content
  // ----
  return Content ? <Content /> : null;
};

StateDependentBodyRow.displayName = 'StateDependentBodyRow';

export default StateDependentBodyRow;
