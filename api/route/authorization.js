'use strict'

const User = require('../../model/user');
const storageSessions = require('../../lib/storage/sessions');


const authorization = async (data, ws) => {
	const { login, password } = data;
	let user, { token } = data;

	if (token) {
		const userId = await storageSessions.getUserIdByToken(token);
		if (!userId)
			throw new Error("Error: session with such a token does not exist (incorrect token, session is completed)!");
		user = await User.getUserById(userId);
	}
	else if (login && password) {
		user = await User.authorize(login, password);
		token = await storageSessions.addSession(user.id);
	}
	else
		throw new Error("Error: token or/and login or/and password not found!");

	ws.token = token;

	delete user.salt;
	delete user.hashedPassword;

	return {
		ok: {
			user,
			token
		}
	};
};


module.exports = authorization;
