module.exports = {
  style: {
    postcss: {
      // Use the postcss.config.js file instead of extends default configuration
      mode: 'file',
      // @craco will add an 'ident' key to postcss configuration
      // object, that is unsupported on postcss ^7 and must be removed
      loaderOptions: (postcssOptions) => {
        if ('ident' in postcssOptions) {
          delete postcssOptions.ident;
        }

        return postcssOptions;
      }
    }
  }
};
