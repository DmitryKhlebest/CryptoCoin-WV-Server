'use strict'

const User = require('../../model/user');
const Coin = require('../../model/coin');
const BalanceCoin = require('../../model/balanceCoin');
const HistoryPurchase = require('../../model/historyPurchase');

const SYSTEM_ADMIN_ID = 1;


const personalBuyCoins = async (data) => {
	// const { coins, userId } = data;
	const { coins } = data;
	const userId = 2;

	const user = await User.getUserById(userId);
	let balance = user.balance;

	const coinsWithPrice = await Coin.get();
	const objectCoinsWithPrice = coinsWithPrice
		.reduce((object, coin) => {
			object[coin.id] = coin.price;
			return object;
		}, {});

	const totalPrice = Number(coins
		.reduce((sum, coin) => {
			sum += objectCoinsWithPrice[coin.id] * coin.quantity;
			return sum;
		}, 0)
		.toFixed(2));

	balance = Number((balance - totalPrice).toFixed(2));
	if (balance < 0)
		throw new Error("Error: insufficient funds!");

	const userBalance = await BalanceCoin.getBalanceCoins(userId);
	const objectUserBalance = userBalance
		.reduce((object, balance) => {
			object[balance.coinId] = balance.quantity;
			return object;
		}, {});

	let updateBalanceCoins = [];
	let createBalanceCoins = [];

	for (const coin of coins) {
		objectUserBalance[coin.id]
			? updateBalanceCoins.push({
				coinId: coin.id,
				quantity: Number((objectUserBalance[coin.id] + coin.quantity).toFixed(2))
			})
			: createBalanceCoins.push({
				coinId: coin.id,
				quantity: Number(coin.quantity.toFixed(2))
			});

		// Занести покупку в историю
		await HistoryPurchase.createHistoryPurchase([
			/*buyerId:*/ userId,
			/*sellerId:*/ SYSTEM_ADMIN_ID,
			/*coinId:*/ coin.id,
			/*quantity:*/ coin.quantity,
			/*price:*/ objectCoinsWithPrice[coin.id],
			/*dateTime:*/ new Date()
		]);
	}

	const newBalanceCoins = updateBalanceCoins.concat(createBalanceCoins);

	await User.updateUserBalance(userId, balance);
	await BalanceCoin.updateBalanceCoin(userId, updateBalanceCoins);
	await BalanceCoin.createBalanceCoin(userId, createBalanceCoins);

	return {
		ok: {
			balance,
			coins: newBalanceCoins
		}
	};
};


module.exports = personalBuyCoins;
