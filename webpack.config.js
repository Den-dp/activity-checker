var webpack = require('webpack'); 

var NODE_ENV = process.env.NODE_ENV || 'development';

function isProduction() {
    return NODE_ENV === 'production';
}

function isDevelopment() {
    return NODE_ENV === 'development';
}

function isTesting() {
    return NODE_ENV === 'testing';
}

function isCoverage(){
    return true;
}

module.exports = {
    context: __dirname,
    entry: {
        'activity-checker': './src/activity-checker.js'
    },

    output: {
        path: __dirname + '/dist',
        filename: isProduction() ? '[name].min.js' : '[name].js',
        libraryTarget: 'umd',
        library: 'ActivityChecker'
    },

    externals: {
        'rx-lite': 'Rx'
        // 'rx': 'Rx'
        // 'rxjs': 'Rx'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            DEBUG: isDevelopment()
        })
    ]
};

if (isDevelopment() || isProduction()) {
    module.exports.module.loaders.push(
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    );
}

if (isProduction()) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({compress: {
            //drop_console: true
        }})
    );
}

if(isTesting()){
    module.exports.entry['activity-checker'] = './test/activity-checker.test.js';
    module.exports.externals = {};
    module.exports.devtool = 'inline-source-map';

    if (!isCoverage()){
        module.exports.module.loaders.push({
            test: /\.js$/, // include only mock and test files
            loader: 'babel', exclude: /node_modules/
        });
    } else {
        module.exports.module.loaders.push({
            test: /\.test\.js$|\.mock\.js$/, // include only mock and test files
            loader: 'babel', exclude: /node_modules/
        },{
            test: /\.js$/,
            loader: 'isparta',
            exclude: /node_modules|\.test.js$|\.mock\.js$/ // exclude node_modules and test files
        });
    }
}
