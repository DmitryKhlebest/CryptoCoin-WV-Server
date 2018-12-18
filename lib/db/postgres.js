'use strict';

const Pool = require('pg').Pool;
const config = require('../../config');


const pool = {
	create(config) {
		this._pool = new Pool(config);
	},
	async connect() {
		let client;
		try {
			client = await this._pool.connect();
		}
		catch (err) {
            console.log(err);
			throw err;
		}
		return client;
	},
	close(client) {
		client.release();
	}
};

pool.create(config.db);


module.exports = pool;
