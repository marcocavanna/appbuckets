import * as React from 'react';
import type { MutableRefObject } from 'react';
import clsx from 'clsx';

import {
  CreatableFunctionComponent,
  createShorthandFactory,
  useAutoControlledValue,
  useForkRef
} from '@appbuckets/react-ui-core';

import ReactSelect, { ActionMeta, ValueType } from 'react-select';

import CreatableReactSelect from 'react-select/creatable';

import { useWithDefaultProps } from '../BucketTheme';

import { splitFieldProps, useSharedClassName, useSplitStateClassName } from '../utils';

import Field from '../Field';

import { SelectDefaultOption, SelectOption, SelectProps, MutableReactSelect } from './Select.types';


/* --------
 * Component Declare
 * -------- */
export type SelectComponent<Option extends SelectOption = SelectDefaultOption> =
  CreatableFunctionComponent<SelectProps<Option>>;


/* --------
 * Component Render
 * -------- */
const SelectRender: React.ForwardRefRenderFunction<MutableReactSelect<SelectDefaultOption>, SelectProps> = (
  <Option extends SelectOption = SelectDefaultOption>(
    receivedProps: React.PropsWithChildren<SelectProps<Option>>,
    ref: ((instance: MutableReactSelect<Option> | null) => void) | MutableRefObject<MutableReactSelect<Option> | null> | null
  ) => {

    const props: React.PropsWithChildren<SelectProps<Option>> = useWithDefaultProps(
      'select',
      receivedProps as any
    );

    /** Split props from className */
    const {
      className,
      rest: {
        /** Strict Select Component Props */
        creatable,
        getOptionValue: userDefinedGetOptionValue,
        getNewOptionData,
        loading,
        options : userDefinedOptions,
        tabIndex: userDefinedTabIndex,

        /** Select Event Handler */
        onBlur              : userDefinedOnBlur,
        onChange            : userDefinedOnChange,
        onFocus             : userDefinedOnFocus,
        onInputChange       : userDefinedOnInputChange,
        onMenuClose         : userDefinedOnMenuClose,
        onMenuOpen          : userDefinedOnMenuOpen,
        onMenuScrollToBottom: userDefinedOnMenuScrollToBottom,
        onMenuScrollToTop   : userDefinedOnMenuScrollToTop,

        /** React Select Props */
        inputValue       : userDefinedInputValue,
        defaultInputValue: userDefinedDefaultInputValue,
        value            : userDefinedValue,
        defaultValue     : userDefinedDefaultValue,

        /** All others prop */
        ...rawRest
      }
    } = useSharedClassName(props);


    // ----
    // Split Props
    // ----
    const [ stateClasses, compoundProps ] = useSplitStateClassName(rawRest);
    const [ fieldProps, rest ] = splitFieldProps(compoundProps);


    // ----
    // Define Internal State and Variables
    // ----
    const [ inputValue, trySetInputValue ] = useAutoControlledValue('', {
      prop       : userDefinedInputValue,
      defaultProp: userDefinedDefaultInputValue
    });

    const [ value, trySetValue ] = useAutoControlledValue(null, {
      prop       : userDefinedValue,
      defaultProp: userDefinedDefaultValue
    });

    const [ createdOptions, setCreatedOptions ] = React.useState<Option[]>([]);

    const fieldRef = React.useRef<HTMLDivElement>(null);
    const selectRef = React.useRef<MutableReactSelect<Option>>(null);
    const handleRef = useForkRef(ref, selectRef);


    // ----
    // Merge UserDefined Options and newly created Options
    // ----
    const options = React.useMemo<Option[]>(
      () => ([ ...userDefinedOptions, ...createdOptions ]),
      [ userDefinedOptions, createdOptions ]
    );


    // ----
    // Define the Element and its computed props
    // ----
    const ElementType: React.ElementType = creatable
      ? CreatableReactSelect
      : ReactSelect;

    const tabIndex = React.useMemo<string | undefined>(
      () => {
        if (fieldProps.disabled || fieldProps.readOnly) {
          return '-1';
        }

        if (userDefinedTabIndex !== undefined && userDefinedTabIndex !== null) {
          return userDefinedTabIndex.toString();
        }

        return undefined;
      },
      [
        fieldProps.disabled,
        fieldProps.readOnly,
        userDefinedTabIndex
      ]
    );

    const classes = clsx(
      {
        required   : fieldProps.required,
        'read-only': fieldProps.readOnly,
        disabled   : fieldProps.disabled
      },
      'react-select',
      stateClasses,
      className
    );


    // ----
    // Get the Current Select Value using its ref
    // ----
    const getOptionValue = React.useCallback(
      (option: Option) => {
        /** If function has not be defined, return as is */
        if (!userDefinedGetOptionValue) {
          return (option?.value as string) ?? '';
        }

        return userDefinedGetOptionValue(option);
      },
      [ userDefinedGetOptionValue ]
    );

    const getOptionValueAsString = React.useCallback(
      (option: Option): string => {
        const optionValue = getOptionValue(option);

        if (optionValue === undefined || optionValue === null) {
          return '';
        }

        if (typeof optionValue !== 'string') {
          return optionValue.toString();
        }

        return optionValue;
      },
      [ getOptionValue ]
    );

    const createNewOption = React.useCallback(
      (newOptionInputValue: string) => {
        /** Assert the getNewOptionData function exists */
        if (typeof getNewOptionData !== 'function') {
          throw new Error('Creatable Select must have the getNewOptionData function');
        }

        /** Transform newOptionInputValue into a valid select option */
        const newOption = getNewOptionData(newOptionInputValue);

        /** Get the new option value */
        const newOptionValue = getOptionValue(newOption);

        /** Add the option to new option array only if value could not be found */
        if (!createdOptions.find(option => getOptionValue(option) === newOptionValue)) {
          setCreatedOptions([ ...createdOptions, newOption ]);
        }
      },
      [ getNewOptionData, createdOptions, getOptionValue ]
    );

    const selectedOption = React.useMemo(
      (): Option | Option[] | null => {
        /** Return default with no Options */
        if (!options || !Array.isArray(options)) {
          return rest.isMulti ? [] : null;
        }

        /** On single select, find the Option */
        if (!rest.isMulti as boolean) {
          return options.find((option) => getOptionValue(option) === value) ?? null;
        }

        /** Return filtered options */
        if (Array.isArray(value)) {
          return options.filter((option) => value.includes(getOptionValue(option)));
        }

        /** Fallback to Empty Array */
        return [];
      },
      [ value, options, getOptionValue, rest.isMulti ]
    );

    const getSelectedValueFromSelectRef = (): (string | number) | (string | number)[] | null => {
      /** Get the Select State */
      const { state } = (selectRef.current ?? {});

      if (!state) {
        return props.isMulti ? [] : null;
      }

      const { value: selectedValue } = state as { value: Option | Option[] | null | undefined };

      if (props.isMulti || Array.isArray(selectedValue)) {
        return Array.isArray(selectedValue) ? selectedValue.map((selected) => getOptionValue(selected)) : [];
      }

      return selectedValue ? getOptionValue(selectedValue) : null;
    };


    // ----
    // Component Handlers
    // ----
    const handleSelectBlur = (e: React.FocusEvent<HTMLElement>) => {
      /** Abort if Disabled or ReadOnly */
      if (fieldProps.disabled || fieldProps.readOnly) {
        return;
      }

      /** Remove focused class from field */
      fieldRef.current?.classList.remove('focused');

      /** Get the selected value */
      if (userDefinedOnBlur) {
        userDefinedOnBlur(e, {
          ...props,
          inputValue,
          value : getSelectedValueFromSelectRef() as any,
          action: null
        } as any);
      }
    };

    const handleSelectChange = (selected: ValueType<Option, false>, action: ActionMeta<Option>) => {
      /** Set field as Dirty */
      fieldRef.current?.classList.add('dirty');

      /** If a new option has been created, append to created options array */
      if (action.action === 'create-option') {
        createNewOption(inputValue);
      }

      const selectedValue = props.isMulti
        ? Array.isArray(selected) ? selected.map((option) => getOptionValue(option)) : []
        : selected ? getOptionValue(selected as Option) : null;

      if (userDefinedOnChange) {
        userDefinedOnChange(null, {
          ...props,
          action,
          inputValue,
          value: selectedValue as any
        });
      }

      trySetValue(selectedValue as any);
    };

    const handleSelectFocus = (e: React.FocusEvent<HTMLElement>) => {
      /** Abort if Disabled or ReadOnly */
      if (fieldProps.disabled || fieldProps.readOnly) {
        return;
      }

      /** Remove focused class from field */
      fieldRef.current?.classList.add('focused');
      fieldRef.current?.classList.add('touched');

      /** Get the selected value */
      if (userDefinedOnFocus) {
        userDefinedOnFocus(e, {
          ...props,
          inputValue,
          value : getSelectedValueFromSelectRef() as any,
          action: null
        });
      }
    };

    const handleInputChange = (newInputValue: string) => {
      if (userDefinedOnInputChange) {
        userDefinedOnInputChange(null, {
          ...props,
          inputValue: newInputValue,
          value     : getSelectedValueFromSelectRef() as any,
          action    : null
        });
      }

      trySetInputValue(newInputValue);
    };

    const handleMenuOpen = () => {
      if (userDefinedOnMenuOpen) {
        userDefinedOnMenuOpen(null, {
          ...props,
          inputValue,
          value : getSelectedValueFromSelectRef() as any,
          action: null
        });
      }
    };

    const handleMenuClose = () => {
      if (userDefinedOnMenuClose) {
        userDefinedOnMenuClose(null, {
          ...props,
          inputValue,
          value : getSelectedValueFromSelectRef() as any,
          action: null
        });
      }
    };

    const handleMenuScrollToBottom = (e: React.SyntheticEvent<HTMLElement>) => {
      if (userDefinedOnMenuScrollToBottom) {
        userDefinedOnMenuScrollToBottom(e, {
          ...props,
          inputValue,
          value : getSelectedValueFromSelectRef() as any,
          action: null
        });
      }
    };

    const handleMenuScrollToTop = (e: React.SyntheticEvent<HTMLElement>) => {
      if (userDefinedOnMenuScrollToTop) {
        userDefinedOnMenuScrollToTop(e, {
          ...props,
          inputValue,
          value : getSelectedValueFromSelectRef() as any,
          action: null
        });
      }
    };


    // ----
    // Render the Component
    // ----
    return (
      <Field
        ref={fieldRef}
        {...fieldProps}
        appearance={rawRest.appearance}
        danger={rawRest.danger}
        info={rawRest.info}
        primary={rawRest.primary}
        secondary={rawRest.secondary}
        success={rawRest.success}
        warning={rawRest.warning}
        contentType={'select input'}
      >
        <ElementType
          {...rest}
          ref={handleRef}
          className={classes}
          classNamePrefix={' '}
          getOptionValue={getOptionValueAsString}
          isDisabled={fieldProps.disabled}
          isLoading={loading}
          tabIndex={tabIndex}
          inputValue={inputValue}
          options={options}
          value={selectedOption}
          onBlur={handleSelectBlur}
          onChange={handleSelectChange}
          onFocus={handleSelectFocus}
          onMenuClose={handleMenuClose}
          onMenuOpen={handleMenuOpen}
          onMenuScrollToBottom={handleMenuScrollToBottom}
          onMenuScrollToTop={handleMenuScrollToTop}
          onInputChange={handleInputChange}
        />
      </Field>
    );
  }
);

const Select: <Option extends SelectOption = SelectDefaultOption>(
  props: React.PropsWithChildren<SelectProps<Option>>
) => (React.ReactElement<Option> | null) = (
  React.forwardRef(SelectRender) as (...args: any[]) => React.ReactElement
);

(Select as SelectComponent).displayName = 'Select';

(Select as SelectComponent).create = createShorthandFactory<SelectProps>(Select, (options) => ({
  options: options as SelectDefaultOption[]
}));

export default Select;
