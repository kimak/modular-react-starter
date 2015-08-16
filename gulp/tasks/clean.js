'use strict';

import gulp from 'gulp';
import del from 'del';


var basePaths = require('../config/basePaths');

gulp.task('clean',  (done) => {
  return del([basePaths.dest], done);
});
