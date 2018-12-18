'use strict'

const BalanceCoin = require('../../model/balanceCoin');


const personalUploadInfo = async (data) => {
    const { userId } = data;
    const coins = await BalanceCoin.getInfoAndBalanceCoins(userId);

    return {
        ok: {
            coins
        }
    };
};


module.exports = personalUploadInfo;
