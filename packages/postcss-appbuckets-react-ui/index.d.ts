import * as postcss from 'postcss';


export type Plugin =
  | 'postcss-import'
  | 'postcss-momentum-scrolling'
  | 'postcss-merge-rules'
  | 'postcss-import-url'
  | 'postcss-discard-duplicates'
  | 'postcss-sort-media-queries'
  | 'postcss-single-charset'
  | 'postcss-discard-comments'
  | 'postcss-single-line'
  | 'autoprefixer'
  | 'css-declaration-sorter'
  | 'cssnano';

export type Mode = 'development' | 'production';

export type PostCSSPlugin = postcss.AcceptedPlugin;

export interface Config {
  /** Export as plugin object */
  asObject?: boolean;

  /** Override default browserslist query */
  browserslist?: { development: string[], production: string[] };

  /** Change default declaration sorter */
  cssDeclarationSorter?: 'alphabetical' | 'smacss' | 'concentric-css'

  /** Exclude plugin */
  exclude?: Plugin[];

  /** Change default media queries sorting */
  mediaQueriesSorting?: 'mobile-first' | 'desktop-first';

  /** Build mode */
  mode?: Mode;
}

declare function getPostCSSPlugins(config?: Config): PostCSSPlugin[];

export { getPostCSSPlugins };
