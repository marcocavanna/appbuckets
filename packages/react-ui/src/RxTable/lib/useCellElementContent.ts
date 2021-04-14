import * as React from 'react';
import { ShorthandItem } from '@appbuckets/react-ui-core';

import { TableCellContentProps } from '../../Table';

import { ComputedCellContentField } from '../RxTable.types';


export default function useCellElementContent<Data>(
  content: undefined | null | ComputedCellContentField<Data>,
  row: Data,
  rowIndex: number,
  data: Data[]
): ShorthandItem<TableCellContentProps> | TableCellContentProps | React.ReactNode | null {

  // ----
  // Return a Memoized Element
  // ----
  return React.useMemo(
    () => {
      /** If no content builder exists, return null */
      if (!content) {
        return null;
      }

      /** If content is a function, then return the result */
      if (typeof content === 'function') {
        return content(row, rowIndex, data);
      }

      /** Else, return the original content */
      return content;
    },
    [ content, rowIndex, data, row ]
  );

}
