import * as React from 'react';
import arraySort from 'array-sort';

import Box from '@appbuckets/react-ui/Box';
import Button from '@appbuckets/react-ui/Button';
import Label from '@appbuckets/react-ui/Label';
import RxTable, { RxTableColumnProps } from '@appbuckets/react-ui/RxTable';

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
        content: (
          <React.Fragment>
            <code className={'property-name'}>{prop.name}</code>
            {prop.required && (<Label as={'span'} warning className={'ml-4'} size={'small'} content={'Required'} />)}
          </React.Fragment>
        )
      }),
      content: (prop) => prop.description
    },
    width    : 50,
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
      content: (props) => (Array.isArray(props.type.value) ? {
        content: (
          props.type.value.map((v) => v.value.replace(/^"|"$/g, '')).join(', ')
        )
      } : undefined)
    },
    width    : 50,
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
        data={[
          ...arraySort(arrangedProps.filter(prop => prop.required), [ 'name' ]),
          ...arraySort(arrangedProps.filter(prop => !prop.required), [ 'name' ])
        ]}
      />
    </div>
  );
};

PropsTable.displayName = 'PropsTable';

export default PropsTable;
