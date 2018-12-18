'use strict'

const Coin = require('../../model/coin');
const HistoryPurchase = require('../../model/historyPurchase');
const storageClients = require('../../lib/storage/clients');


const homeUploadInfo = async (data) => {
    const coins = await Coin.get();
    const countOnline = storageClients.getAllClients().length;
    const totalQuantity = await HistoryPurchase.totalQuantity();
    const totalPrice = await HistoryPurchase.totalPrice();

	return {
		ok: {
			coins,
			info: {
                countOnline,
                totalQuantity,
                totalPrice
            }
		}
	};
};


module.exports = homeUploadInfo;
