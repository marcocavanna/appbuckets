export default function areEqualStringArray(first: (string | number)[], second: (string | number)[]): boolean {
  return first.length === second.length && first.join('%%') === second.join('%%');
}
