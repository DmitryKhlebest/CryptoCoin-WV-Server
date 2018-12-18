'use strict'

const HistoryPurchase = require('../../model/historyPurchase');
const BalanceCoin = require('../../model/balanceCoin');
const SaleCoin = require('../../model/saleCoin');
const User = require('../../model/user');


const marketBuyCoins = async (data) => {
	// const { coins, userId } = data; // { id, quantity }
	const { coins } = data;
	const userId = 2;
	const coinIds = coins.map((coin) => coin.id);

	const objectCoins = coins
		.reduce((object, coin) => {
			object[coin.id] = coin.quantity;
			return object;
		}, {});

	const user = await User.getUserById(userId);
	let balance = user.balance;
	const saleCoins = await SaleCoin.readSaleCoin(coinIds);
	let priceAllCoins = 0;

	for (const saleCoin of saleCoins) {
		// Проверить хватит ли коинов на продажу
		if (!objectCoins[saleCoin.id]
			|| objectCoins[saleCoin.id] > saleCoin.quantity)
			throw new Error("Error: not enough coins on sale!");

		saleCoin.quantity = Number((saleCoin.quantity - objectCoins[saleCoin.id]).toFixed(2));

		priceAllCoins += saleCoin.price * objectCoins[saleCoin.id];
	}

	balance = Number((balance - priceAllCoins).toFixed(2));
	if (balance < 0)
		throw new Error("Error: insufficient funds!");

	// Записать на баланс покупателя новые коины
	const userBalanceCoins = await BalanceCoin.getBalanceCoins(userId);
	const objectUserBalanceCoins = userBalanceCoins
		.reduce((object, balance) => {
			object[balance.coinId] = balance.quantity;
			return object;
		}, {});

	let updateBalanceCoins = [];
	let createBalanceCoins = [];

	for (const saleCoin of saleCoins)
		objectUserBalanceCoins[saleCoin.coinId]
			? updateBalanceCoins.push({
				coinId: saleCoin.coinId,
				quantity: Number((objectUserBalanceCoins[saleCoin.coinId] + objectCoins[saleCoin.id]).toFixed(2))
			})
			: createBalanceCoins.push({
				coinId: saleCoin.coinId,
				quantity: Number(objectCoins[saleCoin.id].toFixed(2))
			});

	const newBalanceCoins = updateBalanceCoins.concat(createBalanceCoins);

	// Обновить баланс коинов покупателя
	await BalanceCoin.updateBalanceCoin(userId, updateBalanceCoins);
	await BalanceCoin.createBalanceCoin(userId, createBalanceCoins);

	// Снять с продажи купленное количество коинов
	//  если их число стало равно 0, то удалить запись продажи
	let updateSaleCoins = [];
	let deleteSaleCoins = [];

	for (const saleCoin of saleCoins) {
		saleCoin.quantity
			? updateSaleCoins.push(saleCoin)
			: deleteSaleCoins.push(saleCoin)

		// Зачислить на баланс продавцов сумму покупки их коинов
		await User.addToBalance(
			saleCoin.userId,
			Number((saleCoin.price * objectCoins[saleCoin.id]).toFixed(2))
		);

		// Занести покупку в историю
		await HistoryPurchase.createHistoryPurchase([
			/*buyerId:*/ userId,
			/*sellerId:*/ saleCoin.userId,
			/*coinId:*/ saleCoin.coinId,
			/*quantity:*/ objectCoins[saleCoin.id],
			/*price:*/ saleCoin.price,
			/*dateTime:*/ new Date()
		]);

	}
	await SaleCoin.updateSaleCoin(updateSaleCoins);
	await SaleCoin.deleteSaleCoin(deleteSaleCoins);
	
	// Снять с баланса покупателя сумму покупки
	await User.updateUserBalance(userId, balance);

	return {
		ok: {
			balance,
			coins: newBalanceCoins
		}
	};
};


module.exports = marketBuyCoins;
