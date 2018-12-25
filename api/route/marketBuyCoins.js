'use strict'

const HistoryPurchase = require('../../model/historyPurchase');
const BalanceCoin = require('../../model/balanceCoin');
const SaleCoin = require('../../model/saleCoin');
const User = require('../../model/user');


const marketBuyCoins = async (data) => {
	const { coins, userId } = data; // { id, quantity }
	const coinIds = coins.map((coin) => coin.id);

	for (const coin of coins)
		if (!(coin.quantity > 0.01)) 
			return {
				error: {
					message: "Error: minimum transaction size is 0.01 coins!"
				}
			};

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

		const price = saleCoin.price * objectCoins[saleCoin.id];
		const aroundPrice = (price > 0 && price < 0.01)
			? 0.01
			: price;

		if (userId !== saleCoin.userId)
			priceAllCoins += aroundPrice;
		else
			priceAllCoins -= aroundPrice;
	};

	console.log("Before balance:", balance);
	balance = Number((balance - priceAllCoins).toFixed(2));
	if (balance < 0)
		throw new Error("Error: insufficient funds!");
	console.log("After balance:", balance);

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

	// Обновить баланс коинов покупателя
	await BalanceCoin.updateBalanceCoin(userId, updateBalanceCoins);
	await BalanceCoin.createBalanceCoin(userId, createBalanceCoins);

	// Снять с продажи купленное количество коинов
	//  если их число стало равно 0, то удалить запись продажи
	let updateSaleCoins = [];
	let deleteSaleCoins = [];

	console.log(saleCoins);

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
	const newUserBalance = await User.updateUserBalance(userId, balance);
	console.log("newUserBalance:", newUserBalance);

	return {
		ok: {
			balance,
			coins: saleCoins
				.map((saleCoin) =>
					({ id: saleCoin.id, quantity: saleCoin.quantity })
				)
		}
	};
};


module.exports = marketBuyCoins;
