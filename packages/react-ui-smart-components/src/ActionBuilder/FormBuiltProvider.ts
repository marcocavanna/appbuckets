import * as React from 'react';

import type { AnyObject } from '@appbuckets/react-ui-core';

import { useHookedFormContext } from '@appbuckets/react-ui-forms';
import { HookedFormContext } from '@appbuckets/react-ui-forms/context';


/* --------
 * Internal Types
 * -------- */
interface UseFormBuiltContextValue {
  /** Set if current form is built in edit mode */
  isEditing: boolean;
}

export type UseFormBuiltResult<Dto extends AnyObject> =
  & UseFormBuiltContextValue
  & HookedFormContext<Dto>;


/* --------
 * Context Definition
 * -------- */
const FormBuiltContext = React.createContext<UseFormBuiltContextValue | undefined>(undefined);
FormBuiltContext.displayName = 'FormBuiltContext';

const FormBuiltProvider = FormBuiltContext.Provider;


/* --------
 * Hook Definition
 * -------- */
export function useFormBuilt<Dto extends AnyObject>(): UseFormBuiltResult<Dto> {
  /** Get the base context */
  const formBuiltContextValue = React.useContext(FormBuiltContext);

  /** Assert context exists */
  if (formBuiltContextValue === undefined) {
    throw new Error(
      '[ @appbuckets/react-ui-smart-components ] : useFormBuilt() hook must be used inside form builder component'
    );
  }

  /** Get main React Hook Form data from its context */
  const useFormReturn = useHookedFormContext<Dto>();

  /** Return context value */
  return {
    ...useFormReturn,
    ...formBuiltContextValue
  };
}

export { FormBuiltProvider };
