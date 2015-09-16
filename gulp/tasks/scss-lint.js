import gulp         from 'gulp';
import gutil        from 'gulp-util';
import scsslint     from 'gulp-scss-lint';
import path         from 'path';
import print        from 'gulp-print';
import _            from 'lodash';
import merge        from 'merge-stream';
import handleErrors from '../utils/handleErrors';
import basePaths    from '../config/basePaths';
import config       from '../config/config';


gulp.task('scss-lint', () => {
  gutil.log(gutil.colors.green('Launch scss linting'));

  var sources = [];

  _.forEach(config.modules, (item, key) => {
    if (!item.styles || !item.styles.src) {
      gutil.log(gutil.colors.yellow('--Skipping scsslint task for: ' + key));

      return;
    }

    sources.push(gulp.src(item.styles.src));
  });

  return merge.apply(this, sources)
    .on('error', handleErrors)
    .pipe(print())
    .pipe(scsslint({
      'config': path.resolve(basePaths.root + '/.scss-lint.yml'),
      'reporterOutput': path.resolve(basePaths.reports + '/scssReport.xml')
      //'maxBuffer': 5 * 1024 * 1024
    }))
    // add 'E' param to failReporter once 0.1.11 is released to allow for non breaking warnings
    // cf https://github.com/juanfran/gulp-scss-lint/issues/28
    .pipe(scsslint.failReporter());
});
