import gulp        from 'gulp';
import runSequence from 'run-sequence';


gulp.task('build', (done) => {
  process.env.NODE_ENV = 'prod';
  
  return runSequence('clean',
    ['bundle', 'styles', 'copy-assets'],
    'index',
    done);
});
