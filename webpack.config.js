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

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new CleanWebpackPlugin()
    ]
};

