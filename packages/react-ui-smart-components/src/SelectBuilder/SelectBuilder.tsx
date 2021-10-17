import * as React from 'react';

import arraySort from 'array-sort';

import { SelectProps, SelectOption } from '@appbuckets/react-ui/Select';

import { useClientRequest } from '@appbuckets/react-app-client';

import type { UseClientRequestState } from '@appbuckets/react-app-client';

import type {
  SelectorComponent,
  SelectorOptions,
  SelectorProps,
  SelectBuilderConfig
} from './SelectBuilder.types';


// eslint-disable-next-line max-len
export default function buildSelector<OptionType extends SelectOption, ValueType = OptionType, Props = {}, HookResult = undefined>(
  config: SelectBuilderConfig<OptionType, ValueType, Props, HookResult>
) {

  const {

    /** Component Options */
    displayName,
    Selector      : DefaultDefinedSelector,
    getOptionValue: defaultGetOptionValue,
    getOptionLabel: defaultGetOptionLabel,

    /** Props Builder */
    defaultProps : defaultPropsBuilder,
    overrideProps: overridePropsBuilder,

    /** Client Request Configuration */
    reloadDataOnMenuOpen: defaultReloadDataOnMenuOpen,
    request,
    useHook,

    /** Data Manipulation */
    filter : defaultDefinedFilter,
    options: defaultDefinedOptions,
    sort   : defaultDefinedSort,

    /** Text Options */
    placeholder     : defaultPlaceholder = 'Select',
    noOptionsMessage: defaultNoOptionsMessage = () => 'No Options'

  } = config;


  /** Define the SelectorWrapper */
  const SelectorWrapper: SelectorComponent<OptionType, ValueType, Props, HookResult> = (
    props
  ) => {

    const {
      Selector: UserDefinedSelector,
      ...restProps
    } = props;

    /* --------
     * Build the Component Props
     * using defined default props
     * builder and override props
     * -------- */

    /** Compute Default Props */
    const defaultProps = typeof defaultPropsBuilder === 'function'
      ? defaultPropsBuilder(restProps)
      : defaultPropsBuilder;

    /** Compute override Props */
    const overrideProps = typeof overridePropsBuilder === 'function'
      ? overridePropsBuilder({ ...defaultProps, ...props })
      : overridePropsBuilder;

    /** Merge all props */
    const componentProps: SelectorProps<OptionType, ValueType, Props, HookResult> = {
      ...defaultProps,
      ...props,
      ...overrideProps
    };

    /** Get Selector Props */
    const {
      filter              : userDefinedFilter,
      options             : userDefinedOptions,
      requestConfig       : userDefinedRequestConfig,
      reloadDataOnMenuOpen: userDefinedReloadDataOnMenuOpen,
      sort                : userDefinedSort,
      Selector            : OverrideSelector,
      ...restSelectProps
    } = componentProps;


    /* --------
     * Rebuild Options using Sorter and Filter
     * -------- */
    const [ hasHook ] = React.useState(() => typeof useHook === 'function');
    const hookResult = hasHook ? useHook!() : undefined;
    const getOptionsList = (optionsList: SelectorOptions<OptionType, ValueType, Props, HookResult>) => {
      /** Build Data */
      const data = typeof optionsList === 'function'
        ? optionsList(props, hookResult as HookResult)
        : optionsList;

      /** Filter Data */
      const filter = defaultDefinedFilter ?? userDefinedFilter;

      const filteredData = typeof filter === 'function'
        ? data.filter(filter)
        : data;

      /** Get Sorter */
      const sort = defaultDefinedSort ?? userDefinedSort;

      return Array.isArray(sort)
        ? arraySort(filteredData, sort as string[])
        : filteredData;
    };


    /**
     * In this special case, useClientRequest hook will
     * be called conditionally.
     * It means that once a selector has been initialized using
     * an API request it could not change to plain data selector
     * without showing a React Warning.
     * To prevent any accidentally change of this behaviour
     * isAPISelector will be saved as a state variable to never
     * change on component using
     */
    const [ isAPISelector ] = React.useState(
      (typeof request === 'object' && request !== null) || typeof request === 'function'
    );

    let clientRequest: UseClientRequestState<OptionType[]> | null = null;

    if (isAPISelector) {
      const {
        url,
        method,
        ...restRequestConfig
      } = typeof request === 'function'
        ? request(componentProps)
        : request!;

      // eslint-disable-next-line
      clientRequest = useClientRequest<OptionType[]>({
        url    : url as string,
        method,
        request: {
          ...restRequestConfig,
          ...userDefinedRequestConfig
        }
      });
    }


    /* --------
     * Hooks and State Definition
     * -------- */
    const [ options, setOptions ] = React.useState<OptionType[]>(
      () => getOptionsList(defaultDefinedOptions || userDefinedOptions || [])
    );
    const [ isInitiallyLoading, setInitiallyLoading ] = React.useState(isAPISelector);


    /* --------
     * Data Reloading Hook
     * -------- */
    if (isAPISelector && clientRequest) {
      // eslint-disable-next-line
      React.useEffect(
        () => {
          if (!clientRequest || clientRequest.isLoading) {
            return;
          }

          if (clientRequest.error) {
            return;
          }

          setOptions(getOptionsList(clientRequest.response));

          setInitiallyLoading(false);
        },
        // eslint-disable-next-line
        [
          clientRequest,
          clientRequest.isLoading,
          clientRequest.response
        ]
      );
    }


    /* --------
     * Handlers
     * -------- */
    const handleMenuOpen = React.useCallback(
      (nothing: null, selectProps: SelectProps<any, any, any>) => {
        const mustReload = defaultReloadDataOnMenuOpen ?? userDefinedReloadDataOnMenuOpen;

        if (clientRequest && mustReload) {
          clientRequest.reload();
        }

        if (restSelectProps.onMenuOpen) {
          restSelectProps.onMenuOpen(nothing, selectProps as any);
        }
      },

      [ clientRequest, restSelectProps, userDefinedReloadDataOnMenuOpen ]
    );


    // @ts-ignore
    const Selector: SelectorComponent<OptionType, ValueType, Props> = OverrideSelector
      ?? UserDefinedSelector
      ?? DefaultDefinedSelector;

    const isLoading = isInitiallyLoading || !!(clientRequest?.isLoading);
    const isDisabled = restSelectProps.disabled || !!(clientRequest?.error);

    /** Return the Selector Component */
    return (
      // @ts-ignore
      <Selector
        isClearable
        getOptionValue={defaultGetOptionValue}
        getOptionLabel={defaultGetOptionLabel}
        {...restSelectProps}
        defaultValue={restSelectProps.defaultValue!}
        noOptionsMessage={restSelectProps.noOptionsMessage ?? defaultNoOptionsMessage}
        placeholder={restSelectProps.placeholder ?? defaultPlaceholder}
        name={restSelectProps.name ?? 'unnamed-selector'}
        danger={restSelectProps.danger || !!(clientRequest?.error)}
        disabled={isLoading || isDisabled}
        loading={isLoading}
        options={options}
        onMenuOpen={handleMenuOpen}
      />
    );

  };

  /** Set the Display Name */
  SelectorWrapper.displayName = displayName;

  /** Return the Wrapped Component */
  return SelectorWrapper;

}
