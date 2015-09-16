import gulp         from 'gulp';
import gutil        from 'gulp-util';
import eslint       from 'gulp-eslint';
import print        from 'gulp-print';
import path         from 'path';
import _            from 'lodash';
import merge        from 'merge-stream';
import minimist     from 'minimist';
import handleErrors from '../utils/handleErrors';
import basePaths    from '../config/basePaths';
import config       from '../config/config';


gulp.task('es-lint',() => {
  gutil.log(gutil.colors.green('Launch ES linting'));

  var sources = [];

  _.forEach(config.modules, (item, key) => {
    if (!item.scripts || !item.scripts.src) {
      gutil.log(gutil.colors.yellow('--Skipping eslint task for: ' + key));

      return;
    }

    sources.push(gulp.src(item.scripts.src));
  });

  // use "gulp eslint --all" to test build files too
  var args = minimist(process.argv.slice(2));
  if (args.all) {
    sources.push(gulp.src(path.resolve(basePaths.root + '/gulp/**/*')));
  }

  return merge.apply(this, sources)
    .on('error', handleErrors)
    .pipe(print())
    .pipe(eslint("./.eslintrc"))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
