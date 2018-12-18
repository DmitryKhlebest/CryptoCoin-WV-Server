'use strict'

const fs = require('fs');

const User = require('../../model/user');
const storageSessions = require('../../lib/storage/sessions');
const { pathDefaultAvatar } = require('../../config');


const registration = async (data, ws) => {
	const { login, password, email } = data;
	if (!login || !password)
		throw new Error("Error: login or/and password not found!");

	const user = await User.registration(login, password, email, pathDefaultAvatar);
	const token = await storageSessions.addSession(user.id);

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


module.exports = registration;
