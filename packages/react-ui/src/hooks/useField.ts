import * as React from 'react';

import type { StrictFieldProps } from '../Field';

import { Subtract } from '../generic';
import { splitFieldProps } from '../utils';


export interface UseFieldReturn<Props> {
  /** Add a set of classes to the field */
  addClassesToField: (...classesToAdd: string[]) => void;

  /** Field ref to pass */
  fieldRef: React.RefObject<HTMLDivElement>;

  /** Props used to render the field */
  fieldProps: StrictFieldProps;

  /** Remove classes from Field */
  removeClassesFromField: (...classesToRemove: string[]) => void;

  /** All other element props */
  rest: Subtract<Props, StrictFieldProps>;

  /** Set the inner field as blurred */
  setFieldBlurred: () => void;

  /** Set the inner field as changed */
  setFieldChanged: () => void;

  /** Set the inner field as clicked */
  setFieldClicked: () => void;

  /** Set the inner field as focused */
  setFieldFocused: () => void;

  /** Reset inner field classes */
  resetField: () => void;
}

export function useField<Props extends StrictFieldProps>(
  props: Props, innerRef?: React.RefObject<HTMLElement>
): UseFieldReturn<Props> {

  const [ fieldProps, rest ] = splitFieldProps<Props>(props);


  // ----
  // Init the Field Ref
  // ----
  const fieldRef = React.useRef<HTMLDivElement>(null);


  // ----
  // Class Management
  // ----
  const addClassesToField = React.useCallback(
    (...classesToAdd: string[]) => {
      classesToAdd.forEach((cx) => {
        if (fieldRef.current) {
          fieldRef.current.classList.add(cx);
        }

        if (innerRef?.current) {
          innerRef?.current.classList.add(cx);
        }
      });
    },
    [ innerRef ]
  );

  const removeClassesFromField = React.useCallback(
    (...classesToRemove: string[]) => {
      classesToRemove.forEach((cx) => {
        if (fieldRef.current) {
          fieldRef.current.classList.remove(cx);
        }

        if (innerRef?.current) {
          innerRef?.current.classList.remove(cx);
        }
      });
    },
    [ innerRef ]
  );


  // ----
  // Handlers
  // ----
  const setFieldBlurred = React.useCallback(
    () => {
      removeClassesFromField('focused');
    },
    [ removeClassesFromField ]
  );

  const setFieldChanged = React.useCallback(
    () => {
      addClassesToField('dirty');
    },
    [ addClassesToField ]
  );

  const setFieldClicked = React.useCallback(
    () => {
      addClassesToField('touched');
    },
    [ addClassesToField ]
  );

  const setFieldFocused = React.useCallback(
    () => {
      addClassesToField('touched', 'focused');
    },
    [ addClassesToField ]
  );

  const resetField = React.useCallback(
    () => {
      removeClassesFromField('focused', 'dirty', 'touched');
    },
    [ removeClassesFromField ]
  );


  // ----
  // Return tools
  // ----
  return {
    addClassesToField,
    fieldProps,
    fieldRef,
    removeClassesFromField,
    rest,
    setFieldBlurred,
    setFieldChanged,
    setFieldClicked,
    setFieldFocused,
    resetField
  };
}
