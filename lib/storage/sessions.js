'use strict'

const redis = require('../db/interface_redis');
const { createToken } = require('../util');
const {
	prefixKeySession,
	sessionLifeTime
} = require('../../config');
let storageSessions = {};


storageSessions.addSession = async (userId) => {
	const token = createToken();
	await redis.addKeyValuePair(prefixKeySession + token, userId, sessionLifeTime);
	return token;
};

storageSessions.getAllSessions = async () => {
	const keys = await redis.getAllKeysByPrefix(prefixKeySession);

	const sessions = await keys.reduce(async (sessions, key) => {
		const value = await redis.getValueByKey(key);
		sessions.push({ key, value });
		return sessions;
	}, []);

	return sessions;
};

storageSessions.getUserIdByToken = async (token) => 
	await redis.getValueByKey(prefixKeySession + token);

storageSessions.getAllTokensById = async (id) => {
	const allKeys = await redis.getAllKeysByPrefix(prefixKeySession);

	const keys = await allKeys.reduce(async (keys, key) => {
		const value = await redis.getValueByKey(key);
		if (Number(value) === Number(id))
			keys.push(key.substr(prefixKeySession.length));
		return keys;
	}, []);

	return keys;
};

storageSessions.deleteSession = async (token) =>
	await redis.deleteKeyValuePair(prefixKeySession + token);


module.exports = storageSessions;
