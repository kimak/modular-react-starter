'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import basePaths from '../config/basePaths';

gulp.task('serve', () => {
  return browserSync({
    server: {
      baseDir: basePaths.dest
    },
    port: 8000,
    open: true
  });
});

gulp.watch([basePaths.dest+"/**/*.html",
            basePaths.dest+"/**/*.js",
            basePaths.dest+"/**/*.css"])
            .on("change", browserSync.reload);

module.exports = {
  reload: browserSync.reload
};
