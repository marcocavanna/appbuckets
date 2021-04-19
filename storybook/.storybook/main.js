const path = require('path');

module.exports = {

  stories: [ '../stories/*.stories.tsx' ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    '@storybook/addon-postcss'
  ],

  webpackFinal: ((config) => {

    /** Update aliases */
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@appbuckets/react-ui/styles': path.resolve(__dirname, '..', '..', 'packages', 'react-ui', 'styles'),
        '@appbuckets/react-ui'       : path.resolve(__dirname, '..', '..', 'packages', 'react-ui', 'src'),
        '@appbuckets/react-ui-styles': path.resolve(__dirname, '..', '..', 'packages', 'react-ui-styles', 'src')
      }
    };

    return config;
  })

};
