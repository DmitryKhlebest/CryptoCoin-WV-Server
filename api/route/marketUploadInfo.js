'use strict'

const SaleCoin = require('../../model/saleCoin');


const marketUploadInfo = async (data) => {
    const coins = await SaleCoin.readSaleCoinForInfo();

	return {
		ok: {
			coins
		}
    };
};


module.exports = marketUploadInfo;
