import gulp         from 'gulp';
import changed      from 'gulp-changed';
import sass         from 'gulp-sass';
import minifyCSS    from 'gulp-minify-css';
import autoprefixer from 'gulp-autoprefixer';
import print        from 'gulp-print';
import _            from 'lodash';
import gutil        from 'gulp-util';
import rename       from 'gulp-rename';
import sourcemaps   from 'gulp-sourcemaps';
import gulpif       from 'gulp-if';
import handleErrors from '../utils/handleErrors';
import config       from '../config/config';


function getStyleTasks() {
  var tasks = [];

  _.forEach(config.modules, (item, key) => {
    var taskName = 'styles:' + key;

    if (!item.styles || !item.styles.index || !item.styles.dest) {
      gutil.log(gutil.colors.yellow('--Skipping styles task for: ' + key));

      return;
    }

    gulp.task(taskName,  () => {
      var isDev = process.env.NODE_ENV === 'dev';

      gutil.log(gutil.colors.green('Launch sass compression for: ' + taskName));

      return gulp.src(item.styles.index)
        .on('error', handleErrors)
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(changed(item.styles.dest))
        .pipe(sass({
          container: key,
          style: 'expanded'
        }))
        .pipe(autoprefixer('last 1 version'))
        .pipe(rename({
          basename: key
        }))
        .pipe(gulpif(!isDev, minifyCSS()))
        .pipe(gulpif(!isDev, rename({suffix: '.min'})))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(item.styles.dest));
    });

    tasks.push(taskName);
  });

  return tasks;
}

gulp.task('styles', () => {
  return gulp.start(getStyleTasks());
});
