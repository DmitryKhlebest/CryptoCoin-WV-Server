'use strict'

const server = require(__dirname + '/lib/server');
const coins = require(__dirname + '/lib/coins');

coins.loading();
server.start();

