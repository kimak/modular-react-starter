import gulp from 'gulp';

require('./../tasks/unit-test');
require('./../tasks/scss-lint');
require('./../tasks/es-lint');

gulp.task('tests', ['scss-lint', 'es-lint', 'unit-test']);
