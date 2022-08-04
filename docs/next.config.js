const path = require('path');

const workspaceRoot = path.join(__dirname, '../');

module.exports = {
  typescript : {
    ignoreBuildErrors: true
  },
  webpack    : (config, options) => {

    if (options.isServer) {
      const [ nextExternals, ...externals ] = config.externals;

      config.externals = [
        (ctx, callback) => {
          return nextExternals(ctx, callback);
        },
        ...externals
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
        ],
        fallback  : {
          ...config.fallback,
          fs: false
        }
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
