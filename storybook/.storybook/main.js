const MiniCSSExtractPlugin = require('mini-css-extract-plugin');


module.exports = {

  stories: [ '../src/react/**/*.stories.tsx' ],

  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    {
      name   : '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          parser: 'typescript'
        }
      }
    }
  ],

  webpackFinal: async (config) => {

    config.module.rules.push(
      {
        test: /\.tsx?$/,
        use : [
          { loader: require.resolve('ts-loader') }
        ]
      },

      // Parse source typescript files
      {
        test   : /\.stories\.tsx?$/,
        loaders: [
          {
            loader : require.resolve('@storybook/source-loader'),
            options: { parser: 'typescript' }
          }
        ],
        enforce: 'pre'
      },

      // Use Extract Text Plugin to get and compile Style
      {
        test   : /\.scss$/,
        exclude: /node_modules/,
        use    : [
          // MiniCSS Extractor loader
          MiniCSSExtractPlugin.loader,

          // Analyze and Load the CSS
          {
            loader : 'css-loader',
            options: {
              modules      : false,
              importLoaders: 2,
              sourceMap    : true
            }
          },

          // Use PostCSS Loader
          'postcss-loader',

          // Compile SCSS
          {
            loader : 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    config.plugins.push(new MiniCSSExtractPlugin({
      filename: 'style.css'
    }));

    return config;
  }

};
