'use strict';

import path from 'path';

// Filters out non .coffee and .js files. Prevents
// accidental inclusion of possible hidden files
module.exports = (name) => {
  return /(\.(js)$)/i.test(path.extname(name));
};
