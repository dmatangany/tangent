// Karma configuration
// Generated on Sat Aug 11 2018 11:18:40 GMT+0200 (South Africa Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
files: [ 
'assets/js/jquery-1.10.2.js',
'assets/js/bootstrap.min.js',
'assets/Loader/loadingoverlay.js',
'assets/Loader/loadingoverlay_progress.min.js',
'node_modules/angular/angular.js',
'node_modules/angular-mocks/angular-mocks.js',
'assets/js/angular-animate.min.js',
'assets/js/angular-ui-router.js',
'assets/app/app_init.js',
'assets/app/services/getters.js',
'assets/app/services/post.js',
'assets/app/services/edit.js',
'assets/app/services/delete.js',
'assets/app/controllers/editRelationChartCtrl.js',
'test.spec.js',
],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
