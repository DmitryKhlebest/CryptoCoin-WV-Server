'use strict'

const BalanceCoin = require('../../model/balanceCoin');
const Coin = require('../../model/coin');


const personalUploadInfo = async (data) => {
    const { userId } = data;
    const coins = await Coin.get();
    const balanceCoin = await BalanceCoin.getBalanceCoins(userId);

	const balanceCoinHash = balanceCoin
		.reduce((object, coin) => {
			object[coin.coinId] = coin.quantity;
			return object;
		}, {});

    for (const coin of coins)
        coin.quantity = balanceCoinHash[coin.id] || 0;

    return {
        ok: {
            coins
        }
    };
};


module.exports = personalUploadInfo;
