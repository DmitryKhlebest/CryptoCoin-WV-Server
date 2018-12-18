'use strict'

const path = require('path');

const pool = require('../lib/db/postgres');
const util = require('../lib/util');
const filename = path.basename(__filename, '.js');
const sqls = util.readSqls(path.resolve(__dirname, filename + '.sql'));

let HistoryPurchase = {};


HistoryPurchase.totalQuantity = async () => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(sqls.historyPurchase.totalQuantity);

		return rs.rows[0].sum;
	} catch (err) {
		console.log(err);
		// throw new Error("Error: get total quantity!");
	} finally {
		pool.close(client);
	}
};

HistoryPurchase.totalPrice = async () => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(sqls.historyPurchase.totalPrice);

		return rs.rows[0].sum;
	} catch (err) {
		console.log(err);
		// throw new Error("Error: get total price!");
	} finally {
		pool.close(client);
	}
};

HistoryPurchase.createHistoryPurchase = async (historyPurchase) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.historyPurchase.createHistoryPurchase,
			historyPurchase
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: create history purchase!");
	} finally {
		pool.close(client);
	}
};

HistoryPurchase.purchasesTable = async (userId) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.historyPurchase.purchasesTable,
			[ userId ]
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get purchases table!");
	} finally {
		pool.close(client);
	}
};

HistoryPurchase.salesTable = async (userId) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(
			sqls.historyPurchase.salesTable,
			[ userId ]
		);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get sales table!");
	} finally {
		pool.close(client);
	}
};


module.exports = HistoryPurchase;
