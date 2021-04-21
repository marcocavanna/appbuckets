import * as React from 'react';

import { handleRef } from '@appbuckets/react-ui-core';


export default function useForkRef<Instance>(
  refA: React.Ref<Instance> | null | undefined,
  refB: React.Ref<Instance> | null | undefined
): React.Ref<Instance> | null {
  return React.useMemo(
    () => {
      if (refA === null && refB === null) {
        return null;
      }
      return (refValue) => {
        handleRef(refA, refValue);
        handleRef(refB, refValue);
      };
    },
    [ refA, refB ]
  );
}
