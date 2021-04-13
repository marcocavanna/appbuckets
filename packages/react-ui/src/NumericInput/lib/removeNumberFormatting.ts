export function removeNumberFormatting(
  str?: string | null,
  decimalSeparator?: string
): number | null {
  /** Return null while parsing invalid string */
  if (str === undefined || str === null || !str.length) {
    return null;
  }

  /** Remove all invalid char */
  let rawString = str.replace(new RegExp(`[^-\\d${decimalSeparator ? `\\${decimalSeparator}` : ''}]`, 'g'), '');

  /** If decimalSeparator exists, transform into '.' */
  if (decimalSeparator) {
    rawString = rawString.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
  }

  /** If is invalid return null */
  if (!rawString.length || Number.isNaN(+rawString)) {
    return null;
  }

  return +rawString;
}
