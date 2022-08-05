import * as React from 'react';

import type { AccordionSectionChangeHandler } from '../Accordions';


/* --------
 * Internal Type
 * -------- */
export type UseAccordionSectionChangeReturn = [
  number[],
  AccordionSectionChangeHandler,
  React.Dispatch<React.SetStateAction<number[]>>
];


/**
 * Use this hook to get automatically the active indexes
 * of an Accordion Component.
 * Additionally function to force change will be returned
 *
 * @param initialValue
 */
export function useAccordionSectionChange(initialValue?: number[] | null): UseAccordionSectionChangeReturn {

  // ----
  // Internal State
  // ----
  const [ activeIndexes, setActiveIndexes ] = React.useState<number[]>(initialValue ?? []);


  // ----
  // Handler
  // ----
  const handleAccordionSectionChange = React.useCallback<AccordionSectionChangeHandler>(
    (action, accordionProps) => {
      /** Update the ActiveIndexes */
      setActiveIndexes(accordionProps.activeIndexes ?? []);
    },
    []
  );


  // ----
  // Hook Return
  // ----
  return [ activeIndexes, handleAccordionSectionChange, setActiveIndexes ];

}
