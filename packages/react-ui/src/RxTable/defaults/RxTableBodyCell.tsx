import * as React from 'react';

import { childrenUtils } from '@appbuckets/react-ui-core';

import useCellElementContent from '../lib/useCellElementContent';

import TableCell from '../../Table/TableCell';
import TableCellContent from '../../Table/TableCellContent';

import { RxTableCellComponent } from '../RxTable.types';


/* --------
 * Component Definition
 * -------- */
const RxTableBodyCell: RxTableCellComponent<any> = (props) => {

  const {
    children,
    className,
    column,
    isVirtualized,
    tableData,
    rowIndex,
    row,
    style
  } = props;

  const {
    Content,
    render,
    cell,
    key
  } = column;


  // ----
  // Memoize Cell Element Content
  // ----
  const metaContent = useCellElementContent(cell?.meta, row, rowIndex, tableData);
  const headerContent = useCellElementContent(cell?.header, row, rowIndex, tableData);
  const contentContent = useCellElementContent(cell?.content, row, rowIndex, tableData);

  const renderedContent = useCellElementContent(render, row, rowIndex, tableData);


  // ----
  // Build the Wrapper
  // ----
  const Wrapper = React.useCallback<React.FunctionComponent>(
    ({ children: wrapperChildren }) => {
      if (!isVirtualized) {
        return (
          <TableCell className={className} style={style}>
            {wrapperChildren}
          </TableCell>
        );
      }

      return (
        <div className={className} style={style}>
          <div className={'virtualized cell-content'}>
            {wrapperChildren}
          </div>
        </div>
      );
    },
    [ isVirtualized, className, style ]
  );


  // ----
  // Render Children if they are declared
  // ----
  if (!childrenUtils.isNil(children)) {
    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
  }


  // ----
  // If Content Component has been declared, use it
  // ----
  if (Content) {
    return (
      <Wrapper>
        <Content
          column={column}
          data={tableData}
          rowIndex={rowIndex}
          row={row}
        />
      </Wrapper>
    );
  }


  // ----
  // If a render function has been declared, use it
  // ----
  if (typeof render === 'function') {
    return (
      <Wrapper>
        {renderedContent}
      </Wrapper>
    );
  }


  // ----
  // Render the Content using Shorthand
  // ----
  if (cell) {
    return (
      <Wrapper>
        {TableCellContent.create(metaContent, {
          autoGenerateKey: false,
          overrideProps  : {
            type: 'meta'
          }
        })}
        {TableCellContent.create(headerContent, {
          autoGenerateKey: false,
          overrideProps  : {
            type: 'title'
          }
        })}
        {TableCellContent.create(contentContent, {
          autoGenerateKey: false,
          overrideProps  : {
            type: 'content'
          }
        })}
      </Wrapper>
    );
  }


  // ----
  // Render the Content using column key
  // ----
  return (
    <Wrapper>
      {TableCellContent.create(row[key] || '', {
        autoGenerateKey: false,
        overrideProps  : {
          type: 'title'
        }
      })}
    </Wrapper>
  );
};

RxTableBodyCell.displayName = 'RxTableBodyCell';

export default RxTableBodyCell;
