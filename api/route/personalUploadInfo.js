'use strict'

const BalanceCoin = require('../../model/balanceCoin');
const Coin = require('../../model/coin');


const personalUploadInfo = async (data) => {
    const { userId } = data;
    const coins = await Coin.get();
    const balanceCoin = await BalanceCoin.getBalanceCoins(userId);

    // array = [
    //     { 
    //         id: id1, 
    //         value: value1 
    //     }, 
    //     { 
    //         id: id2, 
    //         value: value2
    //     }
    // ];
    // object = {
    //     id1: value1,
    //     id2: value2
    // }
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
