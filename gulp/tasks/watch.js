import gulp        from 'gulp';
import watchify    from 'watchify';
import _           from 'lodash';
import gutil       from 'gulp-util';
import runSequence from 'run-sequence';
import config      from '../config/config';
import bundle      from './bundle';
import server      from './serve';


function getScriptsWatchTasks() {
  var tasks = [];

  _.forEach(config.modules,  (item, key) => {
    var taskName = 'watchify:' + key;

    if (!item.scripts || !item.scripts.index) {
      gutil.log(gutil.colors.yellow('--Skipping watchify task for: ' + key));

      return;
    }

    gulp.task(taskName, () => {
      gutil.log(gutil.colors.green('Launch browserify bundler for: ' + key));

      var bundler = watchify(bundle.getBundler(item.scripts.index, true));

      bundler.on('update', () => {
        bundle.applyBundler(bundler, item, key);

        gutil.log(gutil.colors.green('Script sources updated ' + key));
      });

      return bundle.applyBundler(bundler, item, key);
    });

    tasks.push(taskName);
  });

  return tasks;
}

function getStylesWatchTasks() {
  var tasks = [],
    taskName;

  _.forEach(config.modules, (item, key) => {
    taskName = 'watch:styles:' + key;

    if (!item.styles || !item.styles.src) {
      gutil.log(gutil.colors.yellow('--Skipping watchStyles task for: ' + key));

      return;
    }

    gulp.task(taskName, () => {
      gutil.log(gutil.colors.green('Launch style watcher for: ' + key));

      gulp.watch(item.styles.src, ['styles:' + key]);
    });

    tasks.push(taskName);
  });

  return tasks;
}

gulp.task('watch:scripts', () => {
  return gulp.start(getScriptsWatchTasks());
});

gulp.task('watch:styles', () => {
  return gulp.start(getStylesWatchTasks());
});

gulp.task('watch',  (done) => {
  runSequence('clean',
    ['watch:scripts', 'styles', 'copy-assets', 'bundleVendor'],
    ['watch:styles', 'index'],
    'server',
    done);
});
