'use strict'

const path = require('path');

const pool = require('../lib/db/postgres');
const util = require('../lib/util');
const filename = path.basename(__filename, '.js');
const sqls = util.readSqls(path.resolve(__dirname, filename + '.sql'));

let User = {};


User.registration = async (login, password, email, imagePath) => {
	let client;
	try {
		client = await pool.connect();

		const rs1 = await client.query(
			sqls.user.authorize,
			[ login ]
		);

		if (rs1.rows[0]) throw new Error();

		const salt = util.createSalt();
		const hashedPassword = util.encryptPassword(password, salt);

		const rs2 = await client.query(
			sqls.user.registration,
			[
				login,
				salt,
				hashedPassword,
				email,
				1000,
				imagePath
			]
		);

		return rs2.rows[0];
	} catch (err) {
		// console.log(err);
		throw new Error("Error: registration!");
	} finally {
		pool.close(client);
	}
};

User.authorize = async (login, password) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.user.authorize,
			[ login ]
		);

		const user = rs.rows[0];
		const isAuthorize = user && util.cheakPassword(user, password);
		if (!isAuthorize) throw new Error();

		return user;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: authorize!");
	} finally {
		pool.close(client);
	}
};

User.updateAvatarPath = async (userId, avatarPath) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.user.updateAvatarPath,
			[
				avatarPath,
				userId
			]
		);

		return rs.rows[0].imagePath;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: update avatar!");
	} finally {
		pool.close(client);
	}
};

User.getUserById = async (id) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.user.getUserById,
			[ id ]
		);

		return rs.rows[0];
	} catch (err) {
		// console.log(err);
		throw new Error("Error: user not found!");
	} finally {
		client && await client.release();
	}
};

User.updateUserBalance = async (userId, balance) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.user.updateUserBalance,
			[
				balance,
				userId
			]
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: user balance changes!");
	} finally {
		pool.close(client);
	}
};

User.addToBalance = async (id, sum) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.user.addToBalance,
			[ sum, id ]
		);

		return rs.rows[0];
	} catch (err) {
		// console.log(err);
		throw new Error("Error: add sum to user balance!");
	} finally {
		client && await client.release();
	}
};


module.exports = User;
