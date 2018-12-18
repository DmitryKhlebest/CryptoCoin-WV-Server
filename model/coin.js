'use strict'

const path = require('path');

const pool = require('../lib/db/postgres');
const util = require('../lib/util');
const filename = path.basename(__filename, '.js');
const sqls = util.readSqls(path.resolve(__dirname, filename + '.sql'));

let Coin = {};

Coin.set = async (coins) => {
	let client;
	try {
		client = await pool.connect();
		await client.query('BEGIN');

		const coinsHave = Boolean((await Coin.get()).length);

		for (const coin of coins) {
			await client.query(
				coinsHave
					? sqls.coin.updateCoin
					: sqls.coin.insertCoin,
				[
					coin.symbol,
					coin.name,
					Math.round(parseFloat(coin.quotes.USD.price) * 100) / 100,
					coin.quotes.USD.percent_change_1h,
					coin.quotes.USD.percent_change_24h,
					coin.quotes.USD.percent_change_7d,
					Math.round(parseFloat(coin.quotes.USD.market_cap) * 100) / 100,
					coin.image_url,
					coin.last_updated
				]
			);
		}

		await client.query('COMMIT');
		return 'ok';
	} catch (err) {
		await client.query('ROLLBACK');
		console.log(err);
		return 'err';
		// throw new Error("Error: set coins!");
	} finally {
		pool.close(client);
	}
};

Coin.get = async (fields) => {
	let client;
	try {
		client = await pool.connect();

		const rs = await client.query(sqls.coin.get);

		return rs.rows;
	} catch (err) {
		// console.log(err);
		throw new Error("Error: get coins!");
	} finally {
		pool.close(client);
	}
};


module.exports = Coin;
