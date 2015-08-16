'use strict';

import gulp from 'gulp';
import _ from 'lodash';
import gutil from 'gulp-util';
import handleErrors from '../utils/handleErrors';
import inject from 'gulp-inject';
import print from 'gulp-print';
import path from 'path';

import basePaths from '../config/basePaths';
import config from '../config/config';


function getIndexTasks() {
  var tasks = [];

  _.forEach(config.modules, (item, key) => {
    var taskName = 'index:' + key;

    if (!item.index) {
      gutil.log(gutil.colors.yellow('--Skipping index task for: ' + key));
      return;
    }

    gulp.task(taskName,() => {
      var sources = [];

      gutil.log(gutil.colors.green('Launch index task for: ' + taskName));


      if (item.styles && item.styles.dest) {
        sources.push(path.resolve(item.styles.dest + '/**/*.css'));
      }

      if (config.dependencies && config.dependencies.dest) {
        sources.push(path.resolve(config.dependencies.dest + '/vendors.js'));
      }
      if (item.scripts && item.scripts.dest) {
        sources.push(path.resolve(item.scripts.dest + '/**/*.js'));
      }

      gulp.watch(item.index, () =>{
          gulp.start(['index:' + key]);
      });

      var src = gulp.src(sources, {
        // no need to read the files, we're only after their paths (will speed up things)
        read: false,
        // this will prevent gulp-inject from using a wrong prefix
        cwd: basePaths.dest
      });

      return gulp.src(item.index)
        .on('error', handleErrors)
        .pipe(print())
        .pipe(inject(src))
        .pipe(gulp.dest(item.dest));

    });

    tasks.push(taskName);



  });

  return tasks;


}

gulp.task('index', getIndexTasks());
