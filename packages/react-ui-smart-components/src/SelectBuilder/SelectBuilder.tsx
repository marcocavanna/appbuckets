import { useClientRequest } from '@appbuckets/react-app-client';
import type { UseClientRequestConfig, UseClientRequestState } from '@appbuckets/react-app-client';

import type { SelectOption, SelectProps, SelectEventProps } from '@appbuckets/react-ui/Select';

import arraySort from 'array-sort';
import * as React from 'react';

import assertUniqueComponentName from '../utils/assertUniqueComponentName';
import isObject from '../utils/isObject';

import type {
  PlainOrBuilder,
  SelectBuilderConfig,
  SelectorComponent,
  SelectorOptions,
  SelectorProps
} from './SelectBuilder.types';


/* --------
 * Builder Function Definition
 * -------- */
export default function buildSelector<OptionType extends SelectOption,
  ValueType = OptionType,
  Props = {},
  HookResult = undefined>(
  config: SelectBuilderConfig<OptionType, ValueType, Props, HookResult>
) {

  // ----
  // Deconstruct base configuration object
  // ----
  const {
    // Strict
    // Component Options
    displayName: defaultDefinedDisplayName,
    Selector   : SelectComponent,

    // Local
    // Props Builder
    defaultProps : defaultPropsBuilder,
    overrideProps: overridePropsBuilder,

    // Options
    options             : defaultDefinedOptions,
    request             : defaultOptionsRequestConfiguration,
    reloadDataOnMenuOpen: defaultReloadDataOnMenuOpen,

    // Data Management
    filter          : defaultDataFilterFn,
    getOptionLabel  : defaultGetOptionLabel,
    getOptionValue  : defaultGetOptionValue,
    noOptionsMessage: defaultNoOptionsMessage,
    placeholder     : defaultPlaceholder,
    sort            : defaultSortDataByKey,

    // Hook Function
    useHook: useCustomHook,

    ...defaultDefinedSelectProps
  } = config;


  // ----
  // Check multiple display name in development mode only
  // ----
  assertUniqueComponentName(defaultDefinedDisplayName, 'selector');


  // ----
  // Define the Build Component
  // ----
  const Selector: SelectorComponent<OptionType, ValueType, Props, HookResult> = (userDefinedProps) => {


    // ----
    // Custom Hook Usage and Result
    // ----
    const [ hasCustomHook ] = React.useState(() => typeof useCustomHook === 'function');
    const customHookResult = hasCustomHook && typeof useCustomHook === 'function'
      ? useCustomHook!()
      : undefined;


    // ----
    // Build Component Props
    // ----

    /** Compute default props */
    const defaultProps = typeof defaultPropsBuilder === 'function'
      ? defaultPropsBuilder(userDefinedProps, customHookResult as HookResult)
      : defaultPropsBuilder;

    /** Compute override props */
    const overrideProps = typeof overridePropsBuilder === 'function'
      ? overridePropsBuilder({ ...defaultProps, ...userDefinedProps }, customHookResult as HookResult)
      : overridePropsBuilder;

    /** Merge all props into a single props object */
    const props: SelectorProps<OptionType, ValueType, Props, HookResult> = {
      ...defaultProps,
      ...userDefinedProps,
      ...overrideProps
    };


    // ----
    // Deconstruct Props
    // ----
    const {
      filter              : userDefinedDataFilterFn,
      noOptionsMessage    : userDefinedNoOptionsMessage,
      options             : userDefinedOptions,
      placeholder         : userDefinedPlaceholder,
      reloadDataOnMenuOpen: userDefinedReloadDataOnMenuOpen,
      request             : userDefinedOptionsRequestConfiguration,
      sort                : userDefinedSortDataByKey,
      ...userDefinedSelectProps
    } = props;


    // ----
    // Memoized Helpers
    // ----
    const getRequestConfig = (
      builder: PlainOrBuilder<UseClientRequestConfig, OptionType, ValueType, Props, HookResult> | undefined
    ): UseClientRequestConfig | null => {
      /** Undefined builder will return null object */
      if (builder === undefined) {
        return null;
      }

      /** Build config using function */
      if (typeof builder === 'function') {
        return builder(props, customHookResult as HookResult);
      }

      /** Return the plain object */
      return builder;
    };

    const getFilteredOptions = React.useCallback(
      (data: OptionType[]): OptionType[] => {
        if (typeof userDefinedDataFilterFn === 'function') {
          return data.filter(userDefinedDataFilterFn);
        }

        if (typeof defaultDataFilterFn === 'function') {
          return data.filter(defaultDataFilterFn);
        }

        return data;
      },
      [ userDefinedDataFilterFn ]
    );

    const getSortedData = React.useCallback(
      (data: OptionType[]): OptionType[] => {
        if (Array.isArray(userDefinedSortDataByKey)) {
          return arraySort(data, userDefinedSortDataByKey as string[]);
        }

        if (Array.isArray(defaultSortDataByKey)) {
          return arraySort(data, defaultSortDataByKey as string[]);
        }

        return data;
      },
      [ userDefinedSortDataByKey ]
    );

    const getNoOptionsMessage = React.useCallback(
      (data: { inputValue: string }): string | null => {
        if (userDefinedNoOptionsMessage) {
          return typeof userDefinedNoOptionsMessage === 'function'
            ? userDefinedNoOptionsMessage(data)
            : userDefinedNoOptionsMessage;
        }

        if (defaultNoOptionsMessage) {
          return typeof defaultNoOptionsMessage === 'function'
            ? defaultNoOptionsMessage(data)
            : defaultNoOptionsMessage;
        }

        return null;
      },
      [ userDefinedNoOptionsMessage ]
    );

    const getOptionsList = (optionsList: SelectorOptions<OptionType, ValueType, Props, HookResult>) => {
      /** Build initial data */
      const initialData = typeof optionsList === 'function'
        ? optionsList(props, customHookResult as HookResult)
        : optionsList;

      /** Filter data */
      const filteredData = getFilteredOptions(initialData);

      /** Return Sorted options */
      return getSortedData(filteredData);
    };


    // ----
    // Merged Data
    // ----
    const selectProps: Omit<SelectProps<OptionType, ValueType, ValueType extends [] ? [] : null>, 'options'> = {
      ...defaultDefinedSelectProps,
      ...userDefinedSelectProps
    };

    const requestConfig: UseClientRequestConfig | undefined = (
      () => {
        const defaultDefinedConfig = getRequestConfig(defaultOptionsRequestConfiguration);
        const userDefinedConfig = getRequestConfig(userDefinedOptionsRequestConfiguration);

        if (!defaultDefinedConfig && !userDefinedConfig) {
          return undefined;
        }

        return {
          ...defaultDefinedConfig,
          ...userDefinedConfig,
          request: {
            ...(defaultDefinedConfig?.request || {}),
            ...(userDefinedConfig?.request || {})
          }
        } as UseClientRequestConfig;
      }
    )();


    // ----
    // Data Loader
    //
    // In this special case, useClientRequest hook will
    // be called conditionally
    // It means that once a selector has been initialized using
    // an API request it could not change to plain data selector
    // without showing a React Warning.
    // To prevent any accidentally change of this behaviour
    // isAPISelector will be saved as a state variable to never
    // change on component using
    // ----
    const [ isAPISelector ] = React.useState(() => isObject(requestConfig) || typeof requestConfig === 'function');
    const [ options, setOptions ] = React.useState<OptionType[]>(
      () => getOptionsList(userDefinedOptions || defaultDefinedOptions || [])
    );
    const [ isInitiallyLoading, setInitiallyLoading ] = React.useState<boolean>(isAPISelector);

    const clientRequestState: UseClientRequestState<OptionType[]> | null = (
      isAPISelector && isObject(requestConfig)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useClientRequest<OptionType[]>(requestConfig)
        : null
    );


    // ----
    // Data Reloading
    // ----
    const {
      isLoading: isLoadingRequest,
      error    : requestError,
      response : requestResponse,
      reload   : reloadRequest
    } = clientRequestState || {};

    React.useEffect(
      () => {
        /** If is an API Selector, options change won't change options state */
        if (isAPISelector) {
          /** Abort if client request is invalid atm */
          if (isLoadingRequest || !!requestError) {
            return;
          }
          /** Set new options based on response */
          setOptions(getOptionsList(requestResponse as OptionType[]));
          setInitiallyLoading(false);
          return;
        }

        setOptions(getOptionsList(userDefinedOptions || defaultDefinedOptions || []));
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        isAPISelector,
        isLoadingRequest,
        requestError,
        requestResponse,
        userDefinedOptions
      ]
    );


    // ----
    // Handlers
    // ----
    const {
      onMenuOpen: userDefinedOnMenuOpenHandler
    } = selectProps;
    const handleMenuOpen = React.useCallback(
      (
        nothing: null,
        selectComponentProps: SelectEventProps<OptionType, ValueType, ValueType extends [] ? [] : null>
      ) => {
        /** Check if must reload data on menu open */
        const mustReloadData = userDefinedReloadDataOnMenuOpen ?? defaultReloadDataOnMenuOpen;

        if (mustReloadData) {
          /** If is an API Selector, launch reload request */
          if (isAPISelector && typeof reloadRequest === 'function') {
            reloadRequest();
          }
          else {
            setOptions(getOptionsList(userDefinedOptions || defaultDefinedOptions || []));
          }
        }

        /** Call user defined onMenuOpen handler if exists */
        if (typeof userDefinedOnMenuOpenHandler === 'function') {
          userDefinedOnMenuOpenHandler(nothing, selectComponentProps);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        userDefinedReloadDataOnMenuOpen,
        isAPISelector,
        reloadRequest,
        userDefinedOptions,
        userDefinedOnMenuOpenHandler
      ]
    );


    // ----
    // Get Option Value and Label function
    // ----
    const getOptionValue = React.useCallback(
      (option: OptionType) => (
        typeof defaultGetOptionValue === 'function'
          ? defaultGetOptionValue(option)
          : option[defaultGetOptionValue as keyof OptionType]
      ),
      []
    );

    const getOptionLabel = React.useCallback(
      (option: OptionType) => (
        typeof defaultGetOptionLabel === 'function'
          ? defaultGetOptionLabel(option)
          : option[defaultGetOptionLabel as keyof OptionType]
      ),
      []
    );


    // ----
    // Internal Computed Props
    // ----
    const isLoading = isInitiallyLoading || !!(clientRequestState?.isLoading);
    const isDisabled = selectProps.disabled || !!(clientRequestState?.error);


    // ----
    // Render the Component
    // ----
    return (
      <SelectComponent
        isClearable
        isSearchable
        {...selectProps}
        defaultValue={selectProps.defaultValue!}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        noOptionsMessage={getNoOptionsMessage}
        placeholder={selectProps.placeholder || userDefinedPlaceholder || defaultPlaceholder}
        name={selectProps.name || 'unnamed-selector'}
        danger={selectProps.danger || !!(clientRequestState?.error)}
        disabled={isLoading || isDisabled}
        loading={isLoading}
        options={options}
        onMenuOpen={handleMenuOpen}
      />
    );

  };


  // ----
  // Set the Display Name
  // ----
  Selector.displayName = defaultDefinedDisplayName;


  // ----
  // Return the Component
  // ----
  return Selector;

}
