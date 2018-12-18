'use strict'

const path = require('path');

const pool = require('../lib/db/postgres');
const util = require('../lib/util');
const filename = path.basename(__filename, '.js');
const sqls = util.readSqls(path.resolve(__dirname, filename + '.sql'));

let SaleCoin = {};


SaleCoin.readSaleCoinForInfo = async () => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.saleCoin.readSaleCoinForInfo
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get sale coins!");
	} finally {
		pool.close(client);
	}
};

SaleCoin.readSaleCoin = async (ids) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.saleCoin.readSaleCoin,
			[ids]
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get sale coins!");
	} finally {
		pool.close(client);
	}
};

SaleCoin.createSaleCoin = async (saleCoin) => {
	let client;
	try {
		client = await pool.connect();

		await client.query(
			sqls.saleCoin.createSaleCoin,
			[
				saleCoin.userId,
				saleCoin.coinId,
				saleCoin.quantity,
				saleCoin.price
			]
		);

		return 'ok';
	} catch (err) {
		// console.log(err);
		throw new Error("Error: create sale coin!");
	} finally {
		pool.close(client);
	}
};

SaleCoin.updateSaleCoin = async (saleCoins) => {
	let client;
	try {
		client = await pool.connect();
		await client.query('BEGIN');

		for (const saleCoin of saleCoins)
			await client.query(
				sqls.saleCoin.updateSaleCoin,
				[
					saleCoin.quantity,
					saleCoin.id
				]
			);

		await client.query('COMMIT');
		return 'ok';
	} catch (err) {
		await client.query('ROLLBACK');
		// console.log(err);
		throw new Error("Error: update sale coin!");
	} finally {
		pool.close(client);
	}
};

SaleCoin.deleteSaleCoin = async (saleCoins) => {
	let client;
	try {
		client = await pool.connect();
		await client.query('BEGIN');

		for (const saleCoin of saleCoins)
			await client.query(
				sqls.saleCoin.deleteSaleCoin,
				[ saleCoin.id ]
			);

		await client.query('COMMIT');
		return 'ok';
	} catch (err) {
		await client.query('ROLLBACK');
		// console.log(err);
		throw new Error("Error: delete sale coin!");
	} finally {
		pool.close(client);
	}
};


module.exports = SaleCoin;
