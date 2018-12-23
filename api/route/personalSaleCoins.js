'use strict'

const BalanceCoin = require('../../model/balanceCoin');
const SaleCoin = require('../../model/saleCoin');


const personalSaleCoins = async (data) => {
	let { coin, userId } = data;
	// userId = 1;
	if (!coin.quantity)
		throw new Error("Error: quantity not found!");

	// получить баланс коинов пользователя -> в объект
	const userBalance = await BalanceCoin.getBalanceCoins(userId);
	const objectUserBalance = userBalance
		.reduce((object, balance) => {
			object[balance.coinId] = balance.quantity;
			return object;
		}, {});

	// Проверить хватит ли коинов на продажу
	if (!objectUserBalance[coin.id]
		|| objectUserBalance[coin.id] < coin.quantity)
		throw new Error("Error: not enough coins on balance!");

	// Создать массив на обновление баланса коина
	const updateBalanceCoin = {
		coinId: coin.id,
		quantity: Number((objectUserBalance[coin.id] - coin.quantity).toFixed(2))
	};
	const updateBalanceCoins = [updateBalanceCoin];

	// Создать объект на создание продажи коина
	const createSaleCoin = {
		userId,
		coinId: coin.id,
		quantity: Number(coin.quantity.toFixed(2)),
		price: Number(coin.price.toFixed(2))
	};

	await SaleCoin.createSaleCoin(createSaleCoin);
	await BalanceCoin.updateBalanceCoin(userId, updateBalanceCoins);

	return {
		ok: {
			coin: updateBalanceCoin
		}
	};
};


module.exports = personalSaleCoins;

// console.log(JSON.stringify({
// 	method: 'personalSaleCoins',
// 	data: {
// 		coin: {
// 			id: 'BTC',
// 			price: 500.9053,
// 			quantity: 34.555
// 		}
// 	}
// }));
