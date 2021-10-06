import * as Yup from 'yup';

import type { AnyObject } from '@appbuckets/react-ui-core';


/* --------
 * Main Function
 * -------- */
export default function defaultValuesFromYupSchema<Dto extends AnyObject = AnyObject>(
  yupSchema: Yup.SchemaOf<Dto>
): any {

  /** Assert schema is a valid object schema */
  if (!(yupSchema instanceof Yup.ObjectSchema)) {
    throw new Error('[ @appbuckets/react-ui-smart-components ] : invalid Yup object schema.');
  }

  /** Check if Scheme has already a default value */
  if (yupSchema.spec.default) {
    return yupSchema.spec.default;
  }

  /** Init the result object */
  const result: AnyObject = {};

  /** Loop fields */
  Object.keys(yupSchema.fields).forEach((fieldName) => {
    /** Get the Field */
    const field = yupSchema.fields[fieldName];

    /** If field is an instance of ObjectSchema, recurse */
    if (field instanceof Yup.ObjectSchema) {
      result[fieldName] = defaultValuesFromYupSchema(field);
      return;
    }

    /** Get the default value from field spec */
    const { default: defaultValue } = field.spec;

    /** Set the right default based on field type */
    switch (field.type) {
      case 'boolean':
        result[fieldName] = !!defaultValue;
        break;

      case 'array':
        result[fieldName] = Array.isArray(defaultValue) ? defaultValue : [];
        break;

      case 'number':
        result[fieldName] = typeof defaultValue === 'number' ? defaultValue : '';
        break;

      case 'date':
        result[fieldName] = defaultValue instanceof Date ? defaultValue : '';
        break;

      case 'string':
        result[fieldName] = typeof defaultValue === 'string' ? defaultValue : '';
        break;

      default:
        if (process.env.NODE_ENV === 'development') {
          global.console.warn(
            '[ @appbuckets/react-ui-smart-components ] : transforming yup schema to object warning: '
            + `could not find an init default value for type ${field.type}.`
          );
        }
        result[fieldName] = defaultValue || '';
    }
  });

  return result;
}
