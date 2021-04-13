import * as React from 'react';
import arraySort from 'array-sort';

import { Button, Box, RxTable, RxTableColumnProps, Label } from '@appbuckets/react-ui';

import { ComponentProp, ComponentsDoc, PropsOptions } from '../utils/parseMarkdown';


/* --------
 * Component Interfaces
 * -------- */
export interface PropsTableProps {
  component: ComponentsDoc;

  propsOptions: PropsOptions;
}


/* --------
 * Extracted Columns
 * -------- */
const columns: RxTableColumnProps<ComponentProp>[] = [
  {
    key      : 'name',
    header   : 'Name',
    cell     : {
      header : (prop) => ({
        content: <code className={'property-name'}>{prop.name}</code>
      }),
      content: (prop) => prop.description
    },
    width    : 40,
    widthType: 'percentage'
  },
  {
    key      : 'type',
    header   : 'Type',
    cell     : {
      header : (prop) => ({
        content : <code>{prop.type.raw || prop.type.name}</code>,
        truncate: false
      }),
      content: (props) => ({
        content: Array.isArray(props.type.value) && (
          props.type.value.map((v) => v.value.replace(/^"|"$/g, '')).join(', ')
        )
      })
    },
    width    : 50,
    widthType: 'percentage'
  },
  {
    key      : 'required',
    header   : 'Required',
    textAlign: 'center',
    render   : (prop) => (
      prop.required
        ? <Label warning content={'Yes'} />
        : <Label content={'No'} />
    ),
    width    : 10,
    widthType: 'percentage'
  }
];


/* --------
 * Component Definition
 * -------- */
const PropsTable: React.FunctionComponent<PropsTableProps> = (props) => {

  const { component } = props;

  const arrangedProps = Object.keys(component.props).reduce<ComponentProp[]>((acc, propName) => {
    acc.push(component.props[propName]);
    return acc;
  }, []);

  return (
    <div className={'props-table'}>
      <Box textAlign={'right'}>
        <Button
          flat
          tooltip={'View Source'}
          target={'_blank'}
          href={`https://github.com/marcocavanna/appbuckets-ui/tree/master/${component.filename}`}
          icon={{ iconStyle: 'fab', name: 'github' }}
        />
      </Box>

      <RxTable
        style={{ tableLayout: 'fixed' }}
        getRowKey={'name'}
        columns={columns}
        data={arraySort(arrangedProps, [ 'name' ])}
      />
    </div>
  );
};

PropsTable.displayName = 'PropsTable';

export default PropsTable;
