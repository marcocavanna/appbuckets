import * as React from 'react';
import { RxTableColumnProps } from '../../collections/RxTable';
import { Panel } from '../../elements/Panel';

import VirtualizedTable from './VirtualizedTable';


export default { title: 'Modules/VirtualizedTable' };

type Data = {
  _id: number;
  title: string;
  description: string;
};

export const BaseTable = () => {

  const [ , setSelectedItem ] = React.useState<Data>();

  const data = React.useMemo(
    () => (
      new Array(10000).fill(1).map<Data>((value, index) => ({
        _id        : index,
        title      : `Product ${index}`,
        description: `Some description for product number ${index}`
      }))
    ),
    []
  );

  const handleSelectItem = React.useCallback(
    (item: Data) => {
      setSelectedItem(item);
    },
    []
  );

  const columns = React.useMemo(
    (): RxTableColumnProps<Data>[] => ([
      {
        width    : 40,
        widthType: 'percentage',
        key      : 'title',
        header   : 'Titolo',
        cell     : {
          header : (item) => `Titolo del Prodotto: ${item.title}`,
          content: (item: Data) => item.description
        },
        sort     : [ 'title' ],
        footer   : (filteredData, selectedData, allData) => (
          `Data Count : ${filteredData.length} / ${allData.length} • ${selectedData.length} Selected`
        ),
        filter   : {
          type: 'input',
          show: (value, row) => {
            return new RegExp(value, 'ig').test(row.title);
          }
        }
      },
      {
        width    : 60,
        widthType: 'percentage',
        key      : 'description',
        header   : 'Descrizione',
        sort     : [ 'description' ]
      },
      {
        width : 100,
        key   : 'status',
        header: 'Status',
        cell  : {
          content: 'Non Ordinato'
        }
      }
    ]),
    []
  );

  return (
    <Panel table className={'mb-0'}>
      <Panel.Header content={'Virtualized Table'} />
      <Panel.Body>
        <VirtualizedTable<Data>
          selectable
          useScrollOnTop
          data={data}
          getRowKey={'_id'}
          headerHeight={45}
          filterRowHeight={52}
          footerRowHeight={52}
          rowHeight={58}
          subtractToHeight={28}
          onRowClick={handleSelectItem}
          columns={columns}
        />
      </Panel.Body>
    </Panel>
  );
};
