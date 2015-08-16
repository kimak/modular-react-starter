'use strict';

var path = require('path');

var basePaths = {
  root: path.resolve(process.cwd())
};

basePaths.src = path.resolve(basePaths.root + '/src');
basePaths.dest = path.resolve(basePaths.root + '/dist');
basePaths.reports = path.resolve(basePaths.root + '/reports');

module.exports = basePaths;
