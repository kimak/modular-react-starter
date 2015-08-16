'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', function (done) {
    process.env.NODE_ENV = 'dev';
    return runSequence('clean',
        ['watch:scripts', 'copy-assets', 'styles','bundleVendor','watch:styles'],
        'index','serve',
        done);
});
