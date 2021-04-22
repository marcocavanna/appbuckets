import * as React from 'react';

import getValue from 'get-value';

import { useForkRef, useEnhancedEffect } from '@appbuckets/react-ui-core';
import { useController } from 'react-hook-form';

import { useHookedFormContext } from '../context';

import type {
  CreateHookedFieldOptions,
  FieldMeta,
  HookedFieldComponent,
  HookedFieldProps
} from './createHookedField.types';


/* --------
 * HookedForm Field Wrapper
 * -------- */
export function createHookedField<Props, RefType, TValue, TDisplayedValue = TValue>(
  options: CreateHookedFieldOptions<Props, RefType, TValue, TDisplayedValue>
): HookedFieldComponent<Props, RefType, TValue> {


  // ----
  // Deconstruct Options
  // ----
  const {
    Component,
    defaultProps,
    displayName,
    formatValue,
    overrideProps,
    parseValue,
    validation: globalValidationRules
  } = options;


  // ----
  // Component Definition
  // ----
  const HookedField = React.forwardRef<RefType, HookedFieldProps<Props, TValue>>(
    (
      receivedProps: HookedFieldProps<Props, TValue>,
      ref: React.ForwardedRef<RefType>
    ) => {

      const props = { ...receivedProps, ...overrideProps };

      /** Get render props, merging with overrideProps */
      const {
        name,
        getErrorOnSubmitted: localGetErrorOnSubmitted = true,
        getErrorOnTouched  : localGetErrorOnTouched = false,
        onBlur             : userDefinedBlurHandler,
        onChange           : userDefinedChangeHandler,
        validation         : localValidationRules,
        ...componentRestProps
      } = props;


      // ----
      // Get Controller
      // ----
      const { control, defaultValues } = useHookedFormContext<any>();
      const {
        field: {
          ref     : fieldRef,
          onBlur  : hookFormBlurHandler,
          onChange: hookFormChangeHandler,
          value
        },
        formState,
        fieldState
      } = useController({
        name,
        control,
        rules: {
          ...globalValidationRules,
          ...localValidationRules
        }
      });


      // ----
      // Assert on Component Mount that a default value exists
      // ----
      useEnhancedEffect(
        () => {
          /** If default value has not been declared, abort */
          if (typeof defaultValues !== 'object' || defaultValues === null) {
            return;
          }

          /** Check default value for field */
          if (process.env.NODE_ENV !== 'production') {
            const defaultValue = getValue(defaultValues, name);
            if (defaultValue === undefined) {
              global.console.warn(
                'Pay Attention : Default value for field '
                + `'${name}' has not been set, it is resolved to undefined.`
              );
            }
          }
        },
        // This hooks must be run only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
      );


      // ----
      // Build Field Meta
      // ----
      const showError = (localGetErrorOnTouched && fieldState.isTouched)
        || (localGetErrorOnSubmitted && formState.submitCount > 0);
      const hasError = (showError && fieldState.invalid) || props.danger;

      const meta: FieldMeta = {
        ...fieldState,
        appearance  : {
          appearance: !hasError ? props.appearance : undefined,
          danger    : hasError,
          info      : !hasError && props.info,
          primary   : !hasError && props.primary,
          secondary : !hasError && props.secondary,
          success   : !hasError && props.success,
          warning   : !hasError && props.warning
        },
        isSubmitting: !!formState.isSubmitting,
        message     : hasError ? fieldState.error?.message : (props as any).message
      };


      // ----
      // Handlers
      // ----
      const handleRef = useForkRef<RefType>(ref, fieldRef);

      const handleBlur = (...args: any[]) => {
        /** Invoke the userDefined Blur handler */
        if (typeof userDefinedBlurHandler === 'function') {
          userDefinedBlurHandler(...args);
        }
        /** Invoke the hook-form onBlur handler */
        hookFormBlurHandler();
      };

      const handleChange = (e?: React.ChangeEvent, componentProps?: Props) => {
        /** If a value parser exists, use it */
        const referenceValue = typeof parseValue === 'function'
          ? parseValue({ event: e, props: componentProps, name, meta })
          : e;

        /** Invoke the userDefined Change handler */
        if (typeof userDefinedChangeHandler === 'function') {
          userDefinedChangeHandler(e, componentProps);
        }

        /** Invoke the hook-form onChange handler */
        hookFormChangeHandler(referenceValue);
      };


      // ----
      // Reformat field value, if a formatter exists
      // ----
      const formattedValue = typeof formatValue === 'function'
        ? formatValue(value, props)
        : value;


      // ----
      // Component Render
      // ----
      return (
        <Component
          innerRef={handleRef}
          meta={meta}
          formState={formState}
          rest={{
            ...componentRestProps,
            onBlur  : handleBlur,
            onChange: handleChange,
            value   : formattedValue,
            name
          } as any}
        />
      );

    }
  );


  // ----
  // Apply Defaults and DisplayName
  // ----
  HookedField.displayName = displayName || 'HookedField';
  HookedField.defaultProps = defaultProps as any;

  return HookedField as any as HookedFieldComponent<Props, RefType, TValue>;
}
