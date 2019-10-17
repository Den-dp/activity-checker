const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    output: {
        filename: 'activity-checker.js',
        library: 'ActivityChecker',
        libraryTarget: 'umd'
    },

    externals: {
        'rx-lite': {
          commonjs: 'rx',
          commonjs2: 'rx',
          root: 'Rx'
        }
    },

    devtool: 'source-map',

    plugins: [
        new CleanWebpackPlugin()
    ]
};

