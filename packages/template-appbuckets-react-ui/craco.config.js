const { getPostCSSPlugins } = require('@appbuckets/postcss-appbuckets-react-ui');

module.exports = {
  /** Extends PostCSS Plugins to Build ReactBucket Style */
  style: {
    postcss: {
      mode   : 'extends',
      plugins: getPostCSSPlugins({
        cssDeclarationSorter: 'smacss'
      })
    }
  }
};
