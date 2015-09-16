import gulp         from 'gulp';
import browserify   from 'browserify';
import babelify     from 'babelify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import uglify       from 'gulp-uglify';
import _            from 'lodash';
import gutil        from 'gulp-util';
import print        from 'gulp-print';
import rename       from 'gulp-rename';
import sourcemaps   from 'gulp-sourcemaps';
import gulpif       from 'gulp-if';
import handleErrors from '../utils/handleErrors';
import config       from '../config/config';


gulp.task(('bundleVendor'),  () => {
  var isDev = process.env.NODE_ENV === 'dev';
  var vendorsBundler = browserify({
    require: config.dependencies.list
  });

  gutil.log(gutil.colors.green('Building vendors bundle'));

  return vendorsBundler.bundle()
    .on('error', handleErrors)
    .pipe(source('vendors.js'))
    .pipe(buffer())  // buffer the vinyl-source-stream
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(gulpif(!isDev, uglify()))
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(config.dependencies.dest));
});


function getBundler(files, isWatched) {
  var bundler = browserify(files, {
    extensions: ['.js', '.jsx'],
    cache: {},  // for watchify
    packageCache: {},  // for watchify
    fullPaths: isWatched // for watchify

  });

  bundler.transform(babelify);

  bundler.external(config.dependencies.list);

  return bundler;
}

function applyBundler(bundler, item, key) {
  var isDev = process.env.NODE_ENV === 'dev';

  return bundler.bundle()
    .on('error', handleErrors)
    .pipe(source(key + ".js")) // create filename
    .pipe(print())
    .pipe(buffer())  // buffer the vinyl-source-stream
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(gulpif(!isDev, uglify()))
    .pipe(gulpif(!isDev, rename({suffix: '.min'})))
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(item.scripts.dest)); // write to destination
}

function getBundleTasks() {
  var tasks = [];

  tasks.push('bundleVendor');

  _.forEach(config.modules, function (item, key) {
    var taskName = 'bundle:' + key;

    if (!item.scripts || !item.scripts.index) {
      gutil.log(gutil.colors.yellow('--Skipping bundle task for: ' + key));

      return;
    }

    gulp.task(taskName,  () => {
      gutil.log(gutil.colors.green('Launch browserify bundler for: ' + taskName));
      var bundler = getBundler(item.scripts.index);

      return applyBundler(bundler, item, key);

    });

    tasks.push(taskName);
  });

  return tasks;


}

gulp.task('bundle', getBundleTasks());

module.exports = {
  applyBundler: applyBundler,
  getBundler: getBundler
};
