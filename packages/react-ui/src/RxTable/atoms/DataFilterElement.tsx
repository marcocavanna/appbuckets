import * as React from 'react';

import Checkbox from '../../Checkbox';
import type { CheckboxProps } from '../../Checkbox';

import Input from '../../Input';
import type { InputProps } from '../../Input';

import MultiSelect from '../../MultiSelect';
import type { MultiSelectProps, MultiSelectEventProps } from '../../MultiSelect';

import Select from '../../Select';
import type { SelectProps, SelectEventProps } from '../../Select';

import { useRxTable } from '../RxTable.context';


/* --------
 * Filters Type
 * -------- */
type CheckboxDataFilter<Data> = {
  initialValue?: boolean,
  type: 'checkbox',
  props?: CheckboxProps,
  show: (value: boolean, data: Data, index: number, array: Data[]) => boolean;
};

type InputDataFilter<Data> = {
  initialValue?: string,
  type: 'input',
  props?: InputProps,
  show: (value: string, data: Data, index: number, array: Data[]) => boolean;
};

type MultiSelectDataFilter<Data, Option, Value> = {
  initialValue?: Value[],
  type: 'multi-select',
  props: MultiSelectProps<Option, Value>,
  show: (value: Value[], data: Data, index: number, array: Data[]) => boolean;
};

type SelectDataFilter<Data, Option, Value> = {
  initialValue?: Value,
  type: 'select',
  props: SelectProps<Option, Value>,
  show: (value: Value, data: Data, index: number, array: Data[]) => boolean;
};

export type RxTableDataFilter<Data, Option = any, Value = any> =
  | CheckboxDataFilter<Data>
  | InputDataFilter<Data>
  | MultiSelectDataFilter<Data, Option, Value>
  | SelectDataFilter<Data, Option, Value>;


/* --------
 * Component Interfaces
 * -------- */
export interface DataFilterElementProps {
  /** The column key */
  columnKey: string;

  /** Filter type */
  filter?: RxTableDataFilter<unknown>;
}


/* --------
 * Component Definition
 * -------- */
const DataFilterElement: React.FunctionComponent<DataFilterElementProps> = (props) => {

  const {
    columnKey,
    filter
  } = props;


  // ----
  // Get Context Props
  // ----
  const {
    filter: {
      current: filters,
      set    : setFilter
    }
  } = useRxTable();


  // ----
  // Current Filter Value
  // ----
  const filterValue = filters[columnKey];


  // ----
  // Handlers
  // ----
  const handleFilterChange = React.useCallback(
    (e: any, filterProps?: InputProps | SelectEventProps<any> | MultiSelectEventProps<any> | CheckboxProps) => {
      if (filter) {
        if (filter.type === 'input') {
          setFilter(columnKey, filterProps!.value);
        }
        else if (filter.type === 'checkbox') {
          setFilter(columnKey, !filterValue);
        }
      }
    },
    [
      columnKey,
      filter,
      filterValue,
      setFilter
    ]
  );


  // ----
  // Return empty component if no filter
  // ----
  if (!filter) {
    return null;
  }


  // ----
  // Return the right Filter Component
  // ----
  if (filter.type === 'input') {
    return (
      <Input
        icon={'filter'}
        {...filter.props}
        value={filters[columnKey]}
        onChange={handleFilterChange}
      />
    );
  }

  if (filter.type === 'checkbox') {
    return (
      <Checkbox
        {...filter.props}
        checked={!!filters[columnKey]}
        onChange={handleFilterChange}
      />
    );
  }

  if (filter.type === 'select') {
    return (
      <Select
        {...filter.props}
        isClearable={true}
        onChange={handleFilterChange}
      />
    );
  }

  if (filter.type === 'multi-select') {
    return (
      <MultiSelect
        {...filter.props}
        onChange={handleFilterChange}
      />
    );
  }


  // ----
  // Fallback to Null
  // ----
  return null;
};

DataFilterElement.displayName = 'DataFilterElement';

export default DataFilterElement;
