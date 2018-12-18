'use strict'

const util = require('util');
const request = util.promisify(require('request'));
const Coin = require('../model/coin');

// крипто каренси тикер
// Отсюда берём объекты с url картинки coin-а
const CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data/all/coinlist";
// CRYPTOCOMPARE_URI + this.coinData[symbol].ImageUrl -- сами url картинок
const CRYPTOCOMPARE_URI = "https://www.cryptocompare.com";
// данные о coin-ах
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/v2/ticker/?limit=100";

const timeUpdate = 60;	// seconds
const coinFilter = [
	'BTC',
	'LTC',
	'XRP',
	'XLM',
	'USDT',
	'ETH',
	'EOS',
	'BCH',
	'TRX',
	'ADA'
];
let urlImageCoins = {};


const load = async () => {
	const response = await request(COINMARKETCAP_API_URI);
	const body = JSON.parse(response.body);
	const coinsObjects = body.data;
	let coins = [];

	for (const prop in coinsObjects) {
		let coin = coinsObjects[prop];
		if (!coinFilter.includes(coin.symbol)) continue;
		coin.image_url = urlImageCoins[coin.symbol];
		coins.push(coin);
	}

	const status = await Coin.set(coins);
	console.log(`Coin.load (${(new Date()).toISOString()}): ${status}`);
};

const loadUrlImages = async () => {
	try {
		const response = await request(CRYPTOCOMPARE_API_URI);
		const body = JSON.parse(response.body);
		const coinsObjects = body.Data;

		for (const prop in coinsObjects)
			urlImageCoins[prop] = CRYPTOCOMPARE_URI + coinsObjects[prop].ImageUrl;

		return 'ok';
	} catch (err) {
		console.log(err);
		return 'error';
	}
};

const loading = async () => {
	let status;
	while (status !== 'ok') {
		status = await loadUrlImages();
		console.log(`Coin.urlImageCoins (${ (new Date()).toISOString() }): ${ status }`);
	}

	await load();
	setInterval(() => {
		try {
			load();
		} catch (err) {
			console.log(err);
		}
	}, 1000 * timeUpdate);

	// console.log(await Coin.get());
};


module.exports.loading = loading;
