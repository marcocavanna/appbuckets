const { getPostCSSPlugins } = require('@appbuckets/postcss-react-bucket');

module.exports = {
  plugins: getPostCSSPlugins({ asObject: true })
};
