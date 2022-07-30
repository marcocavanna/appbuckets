export default function multiply(m: number) {
  return function execMultiply(n: number): number {
    return m * n;
  };
}
