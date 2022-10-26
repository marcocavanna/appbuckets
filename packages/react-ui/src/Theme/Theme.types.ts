import type { RecursivePartial } from '@appbuckets/react-ui-core';

import type { TypographyProps } from '../Typography/Typography.types';


/* --------
 * Theme Provider Props
 * -------- */
export interface ThemeProviderProps {
  /** Extend the default theme configuration with custom configuration that will be merged with default */
  extend?: PartialThemeDefaultProps[];

  /** Replace the default theme object with a custom one */
  theme?: ComponentsPartialProps;
}


/* --------
 * All Component default Props
 * -------- */
export interface ComponentsPartialProps {
  Typography: Partial<TypographyProps>;
}

export type PartialThemeDefaultProps = RecursivePartial<ComponentsPartialProps>;
