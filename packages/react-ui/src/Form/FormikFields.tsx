import * as React from 'react';

import { SharedComponentStateProps } from '../generic';

import Checkbox from '../Checkbox';
import type { CheckboxProps } from '../Checkbox';

import ColorPicker from '../ColorPicker';
import type { ColorPickerProps } from '../ColorPicker';

import DayPicker from '../DayPicker';
import type { DayPickerProps, ParsableDate } from '../DayPicker';

import Input from '../Input';
import type { InputProps } from '../Input';

import NumericInput from '../NumericInput';
import type { NumericInputProps } from '../NumericInput';

import MultiSelect from '../MultiSelect';
import type { MultiSelectProps } from '../MultiSelect';

import Select from '../Select';
import type { SelectOption, SelectProps } from '../Select';

import withFormikField from './lib/withFormikField';
import { FormikFieldComponentProps, FormikFieldComponentRenderProps } from './lib/withFormikField.types';


/* --------
 * Internal Hooks
 * -------- */
function useFormikFieldState<P extends { [key: string]: any }>(
  props: React.PropsWithChildren<FormikFieldComponentRenderProps<P, any>>
) {
  return React.useMemo<Partial<SharedComponentStateProps> & { disabled: boolean }>(
    () => ({
      danger  : !!(props.meta.touched && props.state.danger) || !!(props.rest.danger),
      success : !!(props.meta.touched && props.state.success) || !!(props.rest.success),
      warning : !!(props.meta.touched && props.state.warning) || !!(props.rest.warning),
      disabled: !!(props.state.isSubmitting || props.rest.disabled)
    }),
    [
      props.meta.touched,
      props.state.danger,
      props.rest.danger,
      props.state.success,
      props.rest.success,
      props.state.warning,
      props.rest.warning,
      props.state.isSubmitting,
      props.rest.disabled
    ]
  );
}


/* --------
 * Checkbox Wrapped Component
 * -------- */
export const FormikCheckbox = withFormikField<CheckboxProps, boolean>({
  Component: function FormikCheckboxComponent(props) {
    const stateProps = useFormikFieldState(props);

    const {
      value,
      onChange,
      ...rest
    } = props.rest;

    return (
      <Checkbox
        {...rest}
        {...stateProps}
        hint={props.state.message}
        checked={!!value}
        onClick={onChange}
      />
    );
  },
  onChange : (formik, event, props) => {
    formik.setFieldValue(props.name, !!props.checked, true);
  }
});


/* --------
 * Color Picker Wrapped Component
 * -------- */
export const FormikColorPicker = withFormikField<ColorPickerProps, string | null>({
  Component         : function FormikColorPickerComponent(props) {
    const stateProps = useFormikFieldState(props);

    const {
      value,
      ...rest
    } = props.rest;

    return (
      <ColorPicker
        {...rest}
        {...stateProps}
        color={value}
        hint={props.state.message}
      />
    );
  },
  onChange          : (formik, event, props) => {
    formik.setFieldValue(props.name, props.color, true);
  },
  setTouchedOnChange: true
});


/* --------
 * DayPicker Wrapped Component
 * -------- */
export const FormikDayPicker = withFormikField<DayPickerProps<ParsableDate>, number | null>({
  Component: function FormikDayPickerComponent(props) {
    const stateProps = useFormikFieldState(props);

    const {
      value,
      onChange,
      onDayChange: userDefinedDayChangeHandler,
      timestamp,
      ...rest
    } = props.rest;

    const handleDayChange = React.useCallback(
      (nothing: null, componentProps: DayPickerProps) => {
        onChange(nothing, componentProps);
        if (userDefinedDayChangeHandler) {
          userDefinedDayChangeHandler(nothing, componentProps);
        }
      },
      [ onChange, userDefinedDayChangeHandler ]
    );

    return (
      <DayPicker
        {...rest}
        {...stateProps}
        date={value}
        hint={props.state.message}
        onDayChange={handleDayChange}
      />
    );
  },
  onChange : (formik, event, props) => {
    formik.setFieldValue(props.name, props.timestamp, true);
  }
});


/* --------
 * Input Wrapped Component
 * -------- */
export const FormikInput = withFormikField<InputProps, string | number | null | undefined>({
  Component         : function FormikInputComponent(props) {
    const stateProps = useFormikFieldState(props);
    return (
      <Input
        {...props.rest}
        {...stateProps}
        hint={props.state.message}
      />
    );
  },
  setTouchedOnChange: false,
  computeValue      : (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    if (value === null || value === undefined) {
      return '';
    }

    if (typeof (value as any).toString === 'function') {
      return (value as any).toString();
    }

    return '';
  }
});


/* --------
 * Formik Numeric Input
 * -------- */
export const FormikNumericInput = withFormikField<NumericInputProps, number | null>({
  Component         : function FormikNumericInputComponent(props) {
    const stateProps = useFormikFieldState(props);
    return (
      <NumericInput
        {...props.rest}
        {...stateProps}
        hint={props.state.message}
      />
    );
  },
  setTouchedOnChange: false,
  onChange          : (formik, nothing, props) => {
    formik.setFieldValue(props.name, props.value);
  },
  computeValue      : (value) => {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return value;
    }

    return null;
  }
});


/* --------
 * Time Wrapped Input Component
 * -------- */
export const FormikTime = withFormikField<InputProps, number | null, string>({
  Component: function FormikTimeInputComponent(props) {
    const stateProps = useFormikFieldState(props);

    return (
      <Input
        {...props.rest}
        {...stateProps}
        hint={props.state.message}
        type={'time'}
      />
    );
  },

  onChange: ((formik, event, props) => {
    if (typeof props.value !== 'string' || !props.value.length) {
      formik.setFieldValue(props.name, null);
      return;
    }

    const [ hours, minutes ] = props.value.split(':');

    formik.setFieldValue(props.name, (+hours * 3600000) + (+minutes * 60000));
  }),

  computeValue: ((value) => {
    if (typeof value !== 'number') {
      return '';
    }

    const minutes = (value % 3600000) / 60000;
    const hours = Math.trunc((value - minutes) / 3600000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  })
});


/* --------
 * Wrapped Select Component
 * -------- */
export const FormikSelect = <Option extends SelectOption>(
  wrapperProps: React.PropsWithChildren<FormikFieldComponentProps<SelectProps<Option>>>
) => (
  withFormikField<SelectProps<Option>, Option | null>({
    Component: function FormikSelectComponent(props) {
      const stateProps = useFormikFieldState(props);

      return (
        <Select
          {...props.rest}
          {...stateProps}
          hint={props.state.message}
        />
      );
    },

    onChange: (formik, event, props) => {
      formik.setFieldValue(props.name, props.value);
    }
  })(wrapperProps)
);

export const FormikMultiSelect = <Option extends SelectOption>(
  wrapperProps: React.PropsWithChildren<FormikFieldComponentProps<MultiSelectProps<Option>>>
) => (
  withFormikField<MultiSelectProps<Option>, Option[] | null>({
    Component: function FormikSelectComponent(props) {
      const stateProps = useFormikFieldState(props);

      return (
        <MultiSelect
          {...props.rest}
          {...stateProps}
          hint={props.state.message}
        />
      );
    },

    onChange: (formik, event, props) => {
      formik.setFieldValue(props.name, props.value);
    }
  })(wrapperProps)
);
