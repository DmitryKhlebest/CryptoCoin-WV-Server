'use strict'

// const Coin = require('../../model/coin');
const HistoryPurchase = require('../../model/historyPurchase');
// const storageClients = require('../../lib/storage/clients');


const historyUploadInfo = async (data) => {
    const { userId } = data;
    // const userId = 2;

    const purchasesTable = await HistoryPurchase.purchasesTable(userId);
    const salesTable = await HistoryPurchase.salesTable(userId);

    // console.log(purchasesTable, salesTable);
    // console.log(salesTable[0].dateTime);
    // console.log(salesTable[0].dateTime.toString());
    // console.log(typeof salesTable[0].dateTime);

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
