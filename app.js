'use strict'

const server = require(__dirname + '/lib/server');
const coins = require(__dirname + '/lib/coins');

// coins.loading();
server.start();

// Заменять всё в таблице, кроме количества, при обновлении страницы (хранить в массиве коинов и поле количества, но его не заменять), в инпутах выводить количества из массива
// Очищать инпуты после покупки на персональной странице