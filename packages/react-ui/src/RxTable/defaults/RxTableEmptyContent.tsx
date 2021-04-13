import EmptyContent from '../../EmptyContent';

import { useRxTable } from '../RxTable.context';
import { RxTableEmptyContentComponent } from '../RxTable.types';


/* --------
 * Component Definition
 * -------- */
const RxTableEmptyContent: RxTableEmptyContentComponent = (props) => {

  const {
    hasData
  } = props;


  // ----
  // Get extra props
  // ----
  const {
    noDataEmptyContentProps,
    noFilteredDataEmptyContentProps
  } = useRxTable();


  // ----
  // Render an Empty Content if no data exists
  // ----
  if (!hasData) {
    return EmptyContent.create(noDataEmptyContentProps ?? {
      header : 'No Data',
      content: 'No data to show'
    }, {
      autoGenerateKey: false
    });
  }


  // ----
  // Render component if no filtered data exists
  // ----
  return EmptyContent.create(noFilteredDataEmptyContentProps ?? {
    header : 'No Data to Show',
    content: 'No data to show for current filters'
  }, {
    autoGenerateKey: false
  });
};

RxTableEmptyContent.displayName = 'RxTableEmptyContent';

export default RxTableEmptyContent;
