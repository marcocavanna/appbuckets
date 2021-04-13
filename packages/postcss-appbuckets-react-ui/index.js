/* --------
 * Plugin Import
 * -------- */
const atImport = require('postcss-import');
const momentumScrolling = require('postcss-momentum-scrolling');
const mergeRules = require('postcss-merge-rules');
const importUrl = require('postcss-import-url');
const discardDuplicates = require('postcss-discard-duplicates');
const sortMediaQueries = require('postcss-sort-media-queries');
const singleCharset = require('postcss-single-charset');
const discardComments = require('postcss-discard-comments');
const singleLine = require('postcss-single-line');
const autoprefixer = require('autoprefixer');
const sortDeclarations = require('css-declaration-sorter');
const cssnano = require('cssnano');


/**
 * @function getPostCSSPlugins
 *
 * @param {Config} [config]
 *
 * @description
 * Build and configure the Plugin List that must be used
 * to successfully build ReactBucket UI Framework original SCSS Files.
 * This is necessary to include the source file into user project
 * to manage variables and style
 *
 * @returns postcss.AcceptedPlugin[]
 */
function getPostCSSPlugins(config) {

  /** Get building mode */
  const mode = (config || {}).mode || process.env.NODE_ENV || 'production';

  /** Get plugin exclusion */
  const exclude = Array.isArray((config || {}).exclude) ? config.exclude : [];

  /** Set browserslist */
  const defaultBrowserslist = {
    development: [
      'last 1 chrome version',
      'last 1 firefox version',
      'last 1 safari version'
    ],
    production : [
      'last 2 version',
      'cover 98%',
      '>0.2%',
      'not dead',
      'not op_mini all'
    ]
  };

  const autoprefixerBrowserslist = config && config.browserslist && Array.isArray(config.browserslist[mode])
    ? config.browserslist[mode]
    : Array.isArray(defaultBrowserslist[mode])
      ? defaultBrowserslist[mode]
      : defaultBrowserslist.production;

  /**
   * Define the Plugins pool,
   * an Array of Array which define plugin name,
   * function and configuration and the restricted mode
   */
  const pluginsPool = [
    /** Manage atImport declaration */
    [
      'postcss-import',
      'always',
      { skipDuplicates: true },
      atImport
    ],

    /** Add Momentum Scrolling to every Overflow: scroll declaration */
    [
      'postcss-momentum-scrolling',
      'always',
      undefined,
      momentumScrolling
    ],

    /** Merge rules declaration */
    [
      'postcss-merge-rules',
      'always',
      undefined,
      mergeRules
    ],

    /** Transform URL Import */
    [
      'postcss-import-url',
      'always',
      { modernBrowser: true },
      importUrl
    ],

    /** Discard Duplicates Declaration */
    [
      'postcss-discard-duplicates',
      'always',
      undefined,
      discardDuplicates
    ],

    /** Sort declaration */
    [
      'css-declaration-sorter',
      'production',
      { order: (config || {}).cssDeclarationSorter || 'alphabetical' },
      sortDeclarations
    ],

    /** Sort generated media queries */
    [
      'postcss-sort-media-queries',
      'always',
      { sort: (config || {}).mediaQueriesSorting || 'mobile-first' },
      sortMediaQueries
    ],

    /** Assert a single charset declaration exists */
    [
      'postcss-single-charset',
      'always',
      undefined,
      singleCharset
    ],

    /** Discard Comments */
    [
      'postcss-discard-comments',
      'production',
      undefined,
      discardComments
    ],

    /** Transform small declaration into single line */
    [
      'postcss-single-line',
      'production',
      undefined,
      singleLine
    ],

    /** Apply autoprefixer plugin */
    [
      'autoprefixer',
      'always',
      { overrideBrowserslist: autoprefixerBrowserslist },
      autoprefixer
    ],

    /** Minify CSS on production */
    [
      'cssnano',
      'production',
      undefined,
      cssnano
    ]
  ];

  /** Return the plugins array */
  return pluginsPool
    /** Strip plugins */
    .filter((plugin) => {
      if (exclude.includes(plugin[0])) {
        return false;
      }

      return plugin[1] === 'always' || plugin[1] === mode;
    })
    /** Remap to keep function only */
    .reduce((acc, [ pluginName, , options, generator ]) => {
      /** If plugins must be returned as object, append name and options */
      if ((config || {}).asObject) {
        acc[pluginName] = options || {};
      }
      else {
        acc.push(typeof generator === 'function' ? generator(options || {}) : generator);
      }
      /** Return the Accumulator Object */
      return acc;
    }, (config || {}).asObject ? {} : []);

}


module.exports = { getPostCSSPlugins };
