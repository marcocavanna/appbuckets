import * as React from 'react';
import merge from 'deepmerge';

import { defaultBucketThemeConfig } from './BucketTheme.default';

import { PartialThemeOptions, ThemeOptions } from './BucketContext.types';
import { ThemeContext } from './BucketContext';


/* --------
 * Prebuild a Component that will initialize the Bucket Theme
 * -------- */
const BucketTheme: React.FunctionComponent<{ theme?: PartialThemeOptions }> = (
  props
) => {

  /** Get the user defined theme configuration */
  const {
    children,
    theme: userDefinedTheme
  } = props;

  /** Merge theme with default theme configuration */
  const theme: ThemeOptions = merge(defaultBucketThemeConfig, userDefinedTheme as ThemeOptions);

  /** Create the Context Provider element and render with children */
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );

};

BucketTheme.displayName = 'BucketTheme';


export default BucketTheme;
