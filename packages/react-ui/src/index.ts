import multiply from '@appbuckets/react-ui-core';

const defaultMultiplier = multiply(10);

export default function moduleA(n: number): number {
  return defaultMultiplier(n);
}
