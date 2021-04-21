import { contextBuilder } from '@appbuckets/react-ui-core';

import { FieldValues, UseFormReturn } from 'react-hook-form';
import { StrictHookedFormProps } from '../HookedForm/HookedForm.types';


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

  /** The submit button */
  submitButton: StrictHookedFormProps<Values, any, any>['submitButton'];
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
