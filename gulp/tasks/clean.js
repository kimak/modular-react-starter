import gulp      from 'gulp';
import del       from 'del';
import basePaths from '../config/basePaths';


gulp.task('clean',  (done) => {
  return del([basePaths.dest], done);
});
