import { useRxTable } from '../RxTable.context';

import TableCell from '../../Table/TableCell';

import { RxTableFooterCellComponent } from '../RxTable.types';


/* --------
 * Component Definition
 * -------- */
const RxTableFooterCell: RxTableFooterCellComponent = (
  props
) => {

  const {
    className,
    column,
    isVirtualized,
    style
  } = props;


  // ----
  // Get Table Data
  // ----
  const {
    tableData,
    data,
    selection: {
      selectedData
    }
  } = useRxTable();


  // ----
  // Component Render
  // ----
  return (
    TableCell.create(
      typeof column.footer === 'function'
        ? column.footer(tableData, selectedData, data)
        : (column.footer || ''),
      {
        autoGenerateKey: false,
        defaultProps   : {
          className
        },
        overrideProps  : {
          as: isVirtualized ? 'div' : 'td',
          style
        }
      }
    )
  );
};

RxTableFooterCell.displayName = 'RxTableFooterCell';

export default RxTableFooterCell;
