import * as Yup from 'yup';


const invalidDate = new Date('');

export function isoDate() {
  return Yup.date().transform(function parseDate(value, originalValue) {
    /** If value is already a date, keep it */
    if (this.isType(value)) {
      return value;
    }

    /** Cast timestamp to date */
    if (typeof originalValue === 'number') {
      /** Transform into Date Object */
      return new Date(originalValue);
    }

    /** If is string, check if is a valid date before returning it */
    if (typeof originalValue === 'string') {
      /** Parse as timestamp */
      const parsedTimeStamp = Date.parse(originalValue);
      /** Parsed time stamp is NaN on invalid date */
      return Number.isNaN(parsedTimeStamp) ? invalidDate : new Date(parsedTimeStamp);
    }

    /** Return null on not transformed date */
    return null;
  });
}
