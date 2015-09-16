import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', (done) => {
    process.env.NODE_ENV = 'dev';

    return runSequence('clean',
        ['watch:scripts', 'copy-assets', 'styles','bundleVendor','watch:styles'],
        'index','serve',
        done);
});
