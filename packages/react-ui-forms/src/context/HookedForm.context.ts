import { contextBuilder } from '@appbuckets/react-ui-core';

import { FieldValues, UseFormReturn, SetValueConfig } from 'react-hook-form';

import type { FieldPath, UnpackNestedValue, FieldPathValue } from 'react-hook-form';

import { StrictHookedFormProps } from '../HookedForm/HookedForm.types';


/* --------
 * Form Field Change Handler Types
 * -------- */
export type FieldChangedHandlerCallback<Value> = (value: Value) => void;

type UnregisterChangeHandler = () => void;

export type FieldChangeHandler<Values, FieldName extends FieldPath<Values> = FieldPath<Values>> = (
  field: FieldName,
  handler: FieldChangedHandlerCallback<UnpackNestedValue<FieldPathValue<Values, FieldName>>>
) => UnregisterChangeHandler;

export type TriggerFieldChanged<Values, FieldName extends FieldPath<Values> = FieldPath<Values>> = (
  field: FieldName,
  value: UnpackNestedValue<FieldPathValue<Values, FieldName>>
) => void;

export type UseFieldValue<Values, FieldName extends FieldPath<Values> = FieldPath<Values>> =
  (field: FieldName) => [
    UnpackNestedValue<FieldPathValue<Values, FieldName>>,
    (value: UnpackNestedValue<FieldPathValue<Values, FieldName>>, options?: SetValueConfig) => void
  ];


/* --------
 * Context Definition
 * -------- */
export interface HookedFormContext<Values extends FieldValues = FieldValues>
  extends UseFormReturn<Values> {
  /** Element used to wrap form actions */
  actionsWrapper: StrictHookedFormProps<Values, any, any>['actionsWrapper'];

  /** The cancel button */
  cancelButton: StrictHookedFormProps<Values, any, any>['cancelButton'];

  /** Element used to wrap form content */
  contentWrapper: StrictHookedFormProps<Values, any, any>['contentWrapper'];

  /** Default values */
  defaultValues: Values | undefined;

  /** Disable entire form */
  disabled: boolean;

  /** Handle form Cancel */
  handleCancel: () => void;

  /** Handle form value change */
  registerChangeHandler: FieldChangeHandler<Values>;

  /** The submit button */
  submitButton: StrictHookedFormProps<Values, any, any>['submitButton'];

  /** Trigger field changed */
  triggerFieldChanged: TriggerFieldChanged<Values>;

  /** Shorthand to use current field values */
  useFieldValue: <FieldName extends FieldPath<Values> = FieldPath<Values>>(field: FieldName) => [
    UnpackNestedValue<FieldPathValue<Values, FieldName>>,
    (value: UnpackNestedValue<FieldPathValue<Values, FieldName>>, options?: SetValueConfig) => void
  ];
}


/* --------
 * Context Builder
 * -------- */
const {
  hook    : _useHookedFormContext,
  Provider: HookedFormProvider
} = contextBuilder<HookedFormContext<any>>();


function useHookedFormContext<Values extends FieldValues>(): HookedFormContext<Values> {
  return _useHookedFormContext();
}


export {
  useHookedFormContext,
  HookedFormProvider
};
