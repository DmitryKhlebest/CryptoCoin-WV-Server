'use strict'

let clients = [];
let storageClients = {};


storageClients.addClient = (ws) =>
    clients.push(ws);

storageClients.deleteClient = (ws) =>
    clients.splice(
        clients.indexOf(ws), 
        1
    );

storageClients.getAllClients = () =>
    clients;


module.exports = storageClients;
