'use strict'

const WebSocket = require('ws');

const { address } = require('../config');
const controller = require('../api/controller');
const storageClients = require('./storage/clients');


const start = () => {
    const server = new WebSocket.Server(address);

    server.on('connection', async (ws, req) => {
        ws.on('message', (message) => controller(message, ws));
        ws.on('close', () => storageClients.deleteClient(ws));

        storageClients.addClient(ws);
    });

    console.log(`Server start on port 14789 (${address.port})`);
};


module.exports = { start };
