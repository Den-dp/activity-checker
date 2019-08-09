const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    output: {
        filename: 'activity-checker.js',
        library: 'ActivityChecker',
        libraryTarget: 'umd'
    },

    externals: {
        'rx-lite': 'Rx',
    },

    devtool: 'source-map',

    plugins: [
        new CleanWebpackPlugin()
    ]
};

