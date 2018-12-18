'use strict';

var fs = require('fs');

var env = {
	PATH_PROJECT: fs.realpathSync(__dirname + '/..'),
	PATH_CONFIGS: __dirname,
	PATH_MODULES: fs.realpathSync(__dirname + '/../api'),
	PATH_LIBS: fs.realpathSync(__dirname + '/../lib'),
	DEBUG: true
}


module.exports = env;
