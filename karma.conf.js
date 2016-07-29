var path = require('path');
// Karma configuration
// Generated on Wed Jul 13 2016 15:40:51 GMT+0300 (FLE Daylight Time)
var webpackConfig = require('./webpack.config.js');
var entry = path.join(webpackConfig.context, webpackConfig.entry['activity-checker']);
var preprocessors = {};
preprocessors[entry] = ['webpack'];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // frameworks: ['mocha', 'chai-as-promised', 'chai'],
    //'sinon-chai', 'chai', 'mocha', 'sinon'

    plugins: [
      // 'karma-chai',
      // 'karma-chai-as-promised',
      'karma-chrome-launcher',
      'karma-coverage',
      // 'karma-firefox-launcher',
      'karma-jasmine',
      // 'karma-mocha',
      'karma-mocha-reporter',
      // 'karma-nyan-reporter',
      // 'karma-sinon',
      // 'karma-sinon-chai',
      'karma-webpack',
    ],

    // list of files / patterns to load in the browser
    files: [
      //'test/activity-checker.test.js',
      entry
      //'test/**/*Spec.js'
      // 'tests.webpack.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,
    // {
      //'src/**/*.js': ['webpack'],
      //'test/**/*Spec.js': ['webpack', 'sourcemap'],
      //'test/**/*Spec.js': ['webpack'],
      //'tests.webpack.js': ['webpack', 'sourcemap']
      // 'src/activity-checker.test.js': ['webpack']
    // },

    /**
     * if run in watch sourcemaps for src aren't regenerate
     */
    webpack: webpackConfig, 

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'lcov' },
        { type: 'text-summary' }
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // reporter options
    mochaReporter: {
      // showDiff:
      // true	      prints each diff in its own line, same as 'unified'
      // 'unified'	prints each diff in its own line
      // 'inline'	  prints diffs inline
      showDiff: 'inline'
    },
    
    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
