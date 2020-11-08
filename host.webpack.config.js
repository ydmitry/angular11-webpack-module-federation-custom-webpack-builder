const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackMerge = require('webpack-merge');

module.exports = (config, options, targetOptions) => {
  const mfConfig = {
    output: {
      uniqueName: "host"
    },
    optimization: {
      // Only need to bypass a temporary bug
      // Taken from https://github.com/manfredsteyer/webpack_5_module_federation_and_angular_cli/blob/main/projects/mfe1/webpack.extra.js
      runtimeChunk: false
    },
    plugins: [
      new ModuleFederationPlugin({
        remotes: {}, // Dynamic loading
        shared: {
          '@angular/core': {
            eager: true,
          },
          '@angular/common': {
            eager: true,
          },
          '@angular/router': {
            eager: true,
          }
        }
      }),
    ],
  };

  return webpackMerge.smart(config, mfConfig);
};
