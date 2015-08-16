'use strict';

import gulp from 'gulp';
import _ from 'lodash';
import gutil from  'gulp-util';
import path from  'path';
import replace from  'gulp-replace';

import handleErrors from '../utils/handleErrors';
import basePaths from '../config/basePaths';
import config from '../config/config';

function getAssetsTasks() {
  var tasks = [],
    taskName,
    modulesList;

  taskName = 'copyMainIndex';

  modulesList = '\t<ul>\n';



  gulp.task(taskName, () =>  {

    gutil.log(gutil.colors.green('Launch mainIndex copy'));

    return gulp.src(path.resolve(basePaths.src + '/index.html'))
      .on('error', handleErrors)
      .pipe(replace(/<!-- modulesList -->/g, modulesList))
      .pipe(gulp.dest(basePaths.dest));

  });
  tasks.push(taskName);

  _.forEach(config.modules,  (item, key) => {

    modulesList += '\t\t<li>\n\t\t\t<a href="' + key + '">' + key + '</a>\n\t\t</li>\n';

    taskName = 'copy:assets:' + key;

    if (item.copy  && item.dest) {

        gulp.task(taskName, () =>  {

            gutil.log(gutil.colors.green('Launch assets copy : ' + key));


            return gulp.src(item.copy, {base: item.root})
                .on('error', handleErrors)
                .pipe(gulp.dest(item.dest));

        });

        tasks.push(taskName);
    }



    if (!item.index  || !item.dest) {
      gutil.log(gutil.colors.yellow('--Skipping copy index task for: ' + key));
      return;
    }

    taskName = 'copy:index:' + key;

    gulp.task(taskName, () =>  {

      gutil.log(gutil.colors.green('Launch index copy : ' + key));

      return gulp.src(item.index)
          .on('error', handleErrors)
          .pipe(gulp.dest(item.dest));

    });

    tasks.push(taskName);
  });

  modulesList += '\t</ul>\n';

  return tasks;
}

gulp.task('copy-assets', () =>  {
  return gulp.start(getAssetsTasks());
});
