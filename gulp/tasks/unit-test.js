'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import jestcli from 'jest-cli';
import _ from 'lodash';
import util from 'util';
import fileset from 'file-set';
// fix the "Please run node with the --harmony flag!" error
// cf https://github.com/Dakuan/gulp-jest/issues/9
//require('harmonize')(;
import basePaths from '../config/basePaths';
import config from '../config/config';

gulp.task('unit-test', (done) => {

  gutil.log(gutil.colors.green('Launch unit tests'));

  var testRootPatterns = [];
  var dependenciesPatterns = [
    "node_modules\\" + path.sep + "react"
  ];

  _.forEach(config.modules, (item, key) => {

    if (!item.scripts || !item.scripts.root) {
      gutil.log(gutil.colors.yellow('--Skipping jest task for: ' + key));
      return;
    }

    if (!util.isArray(item.scripts.root)) {
      testRootPatterns.push(item.scripts.root);
    } else {
      testRootPatterns = testRootPatterns.concat(item.scripts.root);
    }

    if (item.scripts.dependenciesPatterns) {
      dependenciesPatterns = dependenciesPatterns.concat(item.scripts.dependenciesPatterns);
    }
  });

  dependenciesPatterns = _.uniq(dependenciesPatterns);


  var ls = fileset(testRootPatterns);
  var testRoots = _.uniq(ls.dirs);

  var options = {
    scriptPreprocessor: path.resolve(basePaths.root + "/node_modules/babel-jest"),
    rootDir: basePaths.root,
    // unmockedModulePathPatterns will be transformed to RegExp and matched against required modules path
    // cf jest-cli/HasteModuleLoader.js:616
    // if (unmockRegExp.test(modulePath)) {
    unmockedModulePathPatterns: dependenciesPatterns,
    // testPathIgnorePatterns will be transformed to RegExp
    // cf jest-cli/TestRunner.js:120
    // TestRunner.prototype._isTestFilePath
    testPathIgnorePatterns: [
      "node_modules"
    ],
    moduleFileExtensions: [
      "js",
      "json",
      "react",
      "jsx"
    ],
    testDirectoryName: '__tests__',
    testPathDirs: testRoots
  };

  function onComplete(result) {
    var error;

    if (!result) {
      gutil.log(gutil.colors.bgRed('!!! Jest tests failed! You should fix them asap !!!'));

      error = new Error('Unit tests failed.');
      error.showStack = false;

      return done(error);
    }
    return done();
  }

  return jestcli.runCLI({config: options}, options.rootDir, onComplete);


});

