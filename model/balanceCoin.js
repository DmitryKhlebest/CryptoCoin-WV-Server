'use strict'

const path = require('path');

const pool = require('../lib/db/postgres');
const util = require('../lib/util');
const filename = path.basename(__filename, '.js');
const sqls = util.readSqls(path.resolve(__dirname, filename + '.sql'));

let BalanceCoin = {};


BalanceCoin.getBalanceCoins = async (userId) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.balanceCoin.getBalanceCoins,
			[ userId ]
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get balance coins!");
	} finally {
		pool.close(client);
	}
};

BalanceCoin.getInfoAndBalanceCoins = async (userId) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.balanceCoin.getInfoAndBalanceCoins,
			[ userId ]
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get balance coins!");
	} finally {
		pool.close(client);
	}
};

BalanceCoin.createBalanceCoin = async (userId, createBalanceCoins) => {
	let client;
	try {
		client = await pool.connect();
		await client.query('BEGIN');

		for (const balanceCoin of createBalanceCoins)
			await client.query(
				sqls.balanceCoin.createBalanceCoin,
				[
					userId,
					balanceCoin.coinId,
					balanceCoin.quantity
				]
			);

		await client.query('COMMIT');
		return 'ok';
	} catch (err) {
		await client.query('ROLLBACK');
		// console.log(err);
		throw new Error("Error: create coin balance!");
	} finally {
		pool.close(client);
	}
};

BalanceCoin.updateBalanceCoin = async (userId, updateBalanceCoins) => {
	let client;
	try {
		client = await pool.connect();
		await client.query('BEGIN');
		
		for (const balanceCoin of updateBalanceCoins)
			await client.query(
				sqls.balanceCoin.updateBalanceCoin,
				[
					balanceCoin.quantity,
					userId,
					balanceCoin.coinId
				]
			);

		await client.query('COMMIT');
		return 'ok';
	} catch (err) {
		await client.query('ROLLBACK');
		// console.log(err);
		throw new Error("Error: coin balance updates!");
	} finally {
		pool.close(client);
	}
};


module.exports = BalanceCoin;




