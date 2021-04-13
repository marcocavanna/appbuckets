import * as React from 'react';


export type UseTabIndexConfig = {
  /** The current disabled state of component */
  disabled?: boolean;

  /** The user defined tabIndex prop */
  prop?: number | undefined;

  /** The current readOnly state of component */
  readOnly?: boolean;
};

export function useTabIndex(config: UseTabIndexConfig): number | undefined {
  return React.useMemo(
    () => {
      if (config.prop !== undefined) {
        return config.prop;
      }

      if (config.disabled || config.readOnly) {
        return -1;
      }

      return undefined;
    },
    [
      config.prop,
      config.disabled,
      config.readOnly
    ]
  );
}
