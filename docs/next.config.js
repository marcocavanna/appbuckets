const path = require('path');

const workspaceRoot = path.join(__dirname, '../');

module.exports = {
  typescript : {
    ignoreDevErrors  : true,
    ignoreBuildErrors: true
  },
  webpack    : (config, options) => {

    if (options.isServer) {
      const [ nextExternals, ...externals ] = config.externals;

      if (externals.length > 0) {
        // currently not the case but other next plugins might introduce additional
        // rules for externals. We would need to handle those in the callback
        throw new Error('There are other externals in the webpack config.');
      }

      config.externals = [
        (context, request, callback) => {
          return nextExternals(context, request, callback);
        }
      ];
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        // resolve .tsx first
        extensions: [
          '.tsx',
          ...config.resolve.extensions.filter((extension) => extension !== '.tsx')
        ],
        modules   : [
          ...config.resolve.modules,
          path.resolve(__dirname, '..', 'node_modules')
        ]
      },
      node   : {
        fs: 'empty'
      },
      module : {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test  : /\.md$/,
            loader: 'raw-loader'
          },
          {
            test  : /\.json$/,
            loader: 'raw-loader',
            type  : 'javascript/auto'
          },
          {
            test   : /\.(js|mjs|tsx|ts)$/,
            include: [ workspaceRoot ],
            exclude: /node_modules\/(?!p-queue)/,
            use    : options.defaultLoaders.babel
          }
        ])
      }
    };
  },
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ]
  }
};
