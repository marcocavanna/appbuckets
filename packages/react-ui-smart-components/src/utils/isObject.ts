export default function isObject(value: any): value is {} {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
