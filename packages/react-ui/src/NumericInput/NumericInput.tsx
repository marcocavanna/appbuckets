import * as React from 'react';

import { useAutoControlledValue, useEnhancedEffect, useForkRef } from '@appbuckets/react-ui-core';
import { formatNumber as defaultFormatNumber } from '@appbuckets/formatters';

import { ChangeHandler, FocusHandler } from '../generic';

import { useWithDefaultProps } from '../BucketTheme';

import Input from '../Input';
import type { InputProps } from '../Input';

import { removeNumberFormatting } from './lib/removeNumberFormatting';

import { NumericInputProps } from './NumericInput.types';


/* --------
 * Component Render
 * -------- */
const NumericInput: React.VoidFunctionComponent<NumericInputProps> = React.forwardRef<HTMLInputElement, NumericInputProps>(
  (
    receivedProps, ref
  ) => {

    const props = useWithDefaultProps('numericInput', receivedProps);

    const {
      /** Functional Props */
      allowNegative,
      defaultValue: userDefinedDefaultValue,
      max,
      min,
      value: userDefinedValue,

      /** Number formatter props */
      decimalSeparator,
      flexibleDecimals,
      minPrecision,
      pattern,
      precision,
      prefix,
      suffix,
      thousandSeparator,

      /** User defined handlers */
      onBlur   : userDefinedOnBlurHandler,
      onChange : userDefinedOnChangeHandler,
      onKeyDown: userDefinedOnKeyDownHandler,
      onFocus  : userDefinedOnFocusHandler,

      /** All other field props */
      ...restFieldProps
    } = props;


    /* --------
     * Internal Handlers and Helpers
     * -------- */
    const formatNumber = React.useCallback(
      (num?: number | null): string => {
        /** If number is invalid, return an empty string */
        if (num === undefined || num === null || Number.isNaN(num)) {
          return '';
        }
        /** Return the formatted number */
        return defaultFormatNumber(num, {
          decimalSeparator,
          flexibleDecimals,
          minPrecision,
          pattern,
          precision,
          prefix,
          suffix,
          thousandSeparator
        });
      },
      [
        decimalSeparator,
        flexibleDecimals,
        minPrecision,
        pattern,
        precision,
        prefix,
        suffix,
        thousandSeparator
      ]
    );


    /* --------
     * Internal Helpers
     * -------- */
    const getSafeNumber = React.useCallback(
      (baseNumber?: number | null): number | null => {
        /** If number is invalid, return null */
        if (typeof baseNumber !== 'number' || Number.isNaN(baseNumber)) {
          return null;
        }

        /** If negative number are not allowed and number is negative, return null */
        if (!allowNegative && baseNumber < 0) {
          return 0;
        }

        /** If a min limit exists, and number is inferior, return the min limit */
        if (typeof min === 'number' && baseNumber < min) {
          return min;
        }

        /** If a max limit exists, and number is superior, return the max limit */
        if (typeof max === 'number' && baseNumber > max) {
          return max;
        }

        return baseNumber;
      },
      [ allowNegative, max, min ]
    );


    /* --------
     * Internal State
     * -------- */
    const defaultValue = userDefinedDefaultValue === undefined ? undefined : getSafeNumber(userDefinedDefaultValue);
    const userValue = userDefinedValue === undefined ? undefined : getSafeNumber(userDefinedValue);

    const [ value, trySetValue ] = useAutoControlledValue<number | null>(null, {
      defaultProp: defaultValue,
      prop       : userValue
    });

    const [ inputValue, setInputValue ] = React.useState<string>((value ?? '').toString());

    const [ isFocused, setIsFocused ] = React.useState<boolean>(false);

    const formattedInputValue = React.useMemo(
      () => formatNumber(value),
      [ formatNumber, value ]
    );

    const allowedKeys = React.useMemo(
      (): string[] => {
        /** Insert base keys */
        const keys: string[] = [
          /** Append all numbers */
          ...('0123456789'.split('')),
          /** Append functional keys */
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Backspace',
          'Delete',
          'Enter',
          'Tab'
        ];

        /** If negative number are allowed, append minus symbol */
        if (allowNegative) {
          keys.push('-');
        }

        /** If decimalSeparator exists, add it */
        if (decimalSeparator) {
          keys.push(decimalSeparator);
        }

        return keys;
      },
      [
        decimalSeparator,
        allowNegative
      ]
    );


    // ----
    // Asserting Formatted Value is Visualized
    // --
    // Some libraries (as React Hook Form) will
    // set the value using internal dispatcher and
    // the ref object.
    // This produce an unexpected behaviour resulting
    // in an invalid formatted input.
    // Use a render effect to avoid this
    // ----

    /** Get Refs and ref Handler */
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleRef = useForkRef(inputRef, ref);

    /** Register an effect */
    useEnhancedEffect(
      () => {
        /** Assert only on not focused element */
        if (!isFocused && inputRef.current !== null) {
          inputRef.current.value = formattedInputValue;
        }
      }
    );


    /* --------
     * Handlers
     * -------- */
    const handleInputBlur: FocusHandler<HTMLInputElement, InputProps> = (e) => {
      /** Set input has not focused */
      setIsFocused(false);
      /** If a user defined handler, call it */
      if (userDefinedOnBlurHandler) {
        userDefinedOnBlurHandler(e, { ...props, value });
      }
    };

    const handleInputChange: ChangeHandler<HTMLInputElement, InputProps> = (e, inputProps) => {
      /** Get the new Value */
      const { value: inputValueFromEvent } = inputProps;
      /** Get the value without formatting, if exists */
      const rawNumber = getSafeNumber(removeNumberFormatting(inputValueFromEvent, decimalSeparator));
      /** If an user defined onChange handler exists, call it */
      if (userDefinedOnChangeHandler) {
        userDefinedOnChangeHandler(null, { ...props, value: rawNumber });
      }
      /** Set the input value */
      setInputValue(inputValueFromEvent ?? '');
      /** Try to set the new state */
      trySetValue(rawNumber);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      /** Get the key pressed */
      const { key, ctrlKey } = e;

      /** If key is not present into allowed keys, prevent inserting */
      if (!allowedKeys.includes(key)) {
        e.preventDefault();
        return;
      }

      /** If key is the decimal separator, but a decimals separator already exists, prevent */
      if (decimalSeparator && key === decimalSeparator && inputValue.indexOf(decimalSeparator) !== -1) {
        e.preventDefault();
        return;
      }

      /** Use arrow to increase / decrease value */
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        /** Set the inc value */
        const incValue = ctrlKey ? 10 : 1;
        /** Set the new value */
        const newValue = getSafeNumber(key === 'ArrowDown'
          ? (value ?? 0) - incValue
          : (value ?? 0) + incValue);
        /** If a user defined onChange handler exists, call it */
        if (userDefinedOnChangeHandler) {
          userDefinedOnChangeHandler(null, { ...props, value: newValue });
        }
        /** Set the input value */
        setInputValue(newValue?.toString() ?? '');
        /** Update value */
        trySetValue(newValue);
      }
    };

    const handleInputFocus: FocusHandler<HTMLInputElement, InputProps> = (e) => {
      /** Set the new input value */
      setInputValue(removeNumberFormatting(formattedInputValue, decimalSeparator)?.toString() ?? '');
      /** Set component has focused */
      setIsFocused(true);
      /** If a user defined handler exists, call it */
      if (userDefinedOnFocusHandler) {
        userDefinedOnFocusHandler(e, { ...props, value });
      }
    };


    /* --------
     * Component Render
     * -------- */
    return (
      <Input
        {...restFieldProps}
        ref={handleRef}
        value={isFocused ? inputValue : formattedInputValue}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
      />
    );

  });

NumericInput.displayName = 'NumericInput';

export default NumericInput;
