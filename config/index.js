'use strict';

const db = require('./database');
const env = require('./server.env');
const path = require('path');


const config = {
	address: {
		port: 12345,
		host: 'localhost'
	},
	db,
	env,
	encryptionPassword: {
		ALGORITHM: "sha1",
		PERFORMANCE: "hex"
	},
	prefixKeySession: "coins:token:",
	// pathDirectoryUsers: fs.realpathSync(__dirname + '/../resourse/users'),
	pathDefaultAvatar: 'resourse/images/defaultAvatar.png',
	// defaultAvatarName: "nameless.png",
	sessionLifeTime: 1000 * 60 *60 *24
};


module.exports = config;
