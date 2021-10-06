import * as Yup from 'yup';


/**
 * A validator function that will assert a field is a valid number.
 * This is useful used in combination with HookedSelect to easily extract
 * a value from a chosen option.
 *
 * @param mapper The function used to extract data
 */
export function identity<T extends {}>(mapper: (item: T) => number | null) {
  return Yup.number().transform(function extractIdentityValue(value, originalValue) {
    /** If value is already a valid type, keep it */
    if (this.isType(value)) {
      return value;
    }

    /** Assert an original value exists, before use a the mapper */
    if (originalValue == null) {
      return null;
    }

    /** Use the mapper and extract the value */
    return mapper(originalValue);
  });
}


/**
 * A validator function that will assert a field is a valid number array.
 * This is useful used in combination with HookedMultiSelect to easily extract
 * a value for each item in the array
 *
 * @param mapper The function used to extract data
 */
export function identities<T extends {}>(mapper: (item: T) => number | null) {
  return Yup.array().of(Yup.number()).transform((value, originalValue) => {
    /** Assert original value is an array */
    if (!Array.isArray(originalValue)) {
      return [];
    }

    /** Remap original value */
    return originalValue
      .map((item) => {
        /** Keep value if is a number */
        if (typeof item === 'number') {
          return item;
        }

        /** Remove null value */
        if (item == null) {
          return null;
        }

        /** Use mapper to extract data */
        return mapper(item);
      })
      .filter(item => typeof item === 'number' && !Number.isNaN(item));
  });
}
