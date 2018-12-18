'use strict'

const storageSessions = require('../storage/sessions');
const storageClients = require('../storage/clients');


const getWebSocketsById = (userId) => {
    const tokens = await storageSessions.getAllTokensById(userId);
    const clients = storageClients.getAllClients();

    const webSockets = clients.reduce((webSockets, client) => {
        if (tokens.includes(client.token))
            webSockets.push(client);
        return webSockets;
    }, []);

    return webSockets;
};


module.exports = getWebSocketsById;






