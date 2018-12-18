'use strict'

const crypto = require('crypto');
const fs = require('fs');
const {
	ALGORITHM,
	PERFORMANCE
} = require('../../config').encryptionPassword;

let util = {};


util.encryptPassword = (password, salt) =>
	crypto.createHmac(ALGORITHM, salt).update(password).digest(PERFORMANCE);

util.cheakPassword = (user, password) =>
	util.encryptPassword(password, user.salt) === user.hashedPassword;

util.createSalt = () =>
	Math.random().toString();

util.createToken = () =>
	Math.random().toString(36).substr(2, 11);

util.setValByMultiKey = (obj, key, val) => {
	const keys = key.split(/[^\w-]+/gi);
	key = keys.pop();
	let rs = keys.reduce((_obj, key) => {
		if (null === _obj[key] || 'object' !== typeof _obj[key])
			_obj[key] = {};

		return _obj[key];
	}, obj);

	rs[key] = val;

	return rs[key];
};

util.readSqls = (path) => {
	const ENCODING_UTF8 = 'UTF8';

	let object = {};
	let data = fs.readFileSync(path, ENCODING_UTF8);
	let sqls = data
		.split(/^---\s*/m)
		.slice(1);

	for (let sql of sqls) {
		const key = sql.match(/.+/)[0];
		sql = sql
			.slice(key.length)
			.trim()
			.replace(/\s*--.*$/gm, '')
			.replace(/\s+/g, ' ');

		util.setValByMultiKey(object, key, sql);
	}

	return object;
};


module.exports = util;
