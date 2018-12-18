'use strict'

// const Coin = require('../../model/coin');
const HistoryPurchase = require('../../model/historyPurchase');
// const storageClients = require('../../lib/storage/clients');


const historyUploadInfo = async (data) => {
    // const { userId } = data;
    const userId = 1;

    const purchasesTable = await HistoryPurchase.purchasesTable(userId);
    const salesTable = await HistoryPurchase.salesTable(userId);

    return {
        ok: {
            purchasesTable/*: [
                {
                    id,
                    seller,
                    coinId,
                    name,
                    image_url,
                    quantity,
                    price,
                    date
                }
            ]*/,
            salesTable/*: [
                {
                    id,
                    buyer,
                    coinId,
                    name,
                    image_url,
                    quantity,
                    price,
                    date
                }
            ]*/
        }
    };
};


module.exports = historyUploadInfo;
