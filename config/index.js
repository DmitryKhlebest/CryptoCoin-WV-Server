'use strict';

const db = require('./database');
const env = require('./server.env');
const path = require('path');


const config = {
	address: {
		port: 12345,
		host: '0.0.0.0'
	},
	db,
	env,
	encryptionPassword: {
		ALGORITHM: "sha1",
		PERFORMANCE: "hex"
	},
	prefixKeySession: "coins:token:",
	pathDefaultAvatar: 'resourse/images/defaultAvatar.png',
	sessionLifeTime: 1000 * 60 *60 *24
};


module.exports = config;
