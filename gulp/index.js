"use strict";

import fs from 'fs';
import onlyScripts from './utils/scriptFilter';
import gulp from 'gulp';
import gutil from 'gulp-util';

function autoLoadTasks(root, folder) {
  var tasks = fs.readdirSync(root + folder).filter(onlyScripts);
  tasks.forEach(function (task) {
    require('./' + folder + task);
  });

}

autoLoadTasks("./gulp/", "tasks/");
autoLoadTasks("./gulp/", "register/");

gulp.task('default', function () {
  gutil.log(gutil.colors.yellow('Run "gulp dev or gulp build"'));
});
