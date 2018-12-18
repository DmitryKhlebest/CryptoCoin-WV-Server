'use strict'

const redis = require('redis');
const util = require('util');

const client = redis.createClient();
client.get = util.promisify(client.get);
client.keys = util.promisify(client.keys);


client.on("error", (err) => 
    console.log("Error redis: ", err)
);


module.exports = client;
