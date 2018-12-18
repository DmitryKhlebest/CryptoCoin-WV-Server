'use strict'

const client = require('./redis');
let interfaceRedis = {};


interfaceRedis.addKeyValuePair = (key, value, storageTime) =>
    client.set(key, value, 'EX', storageTime);

interfaceRedis.deleteKeyValuePair = (key) =>
    client.del(key);

interfaceRedis.getAllKeysByPrefix = (prefixKey) =>
    client.keys(`${prefixKey}*`)

interfaceRedis.getValueByKey = (key) =>
    client.get(key);


module.exports = interfaceRedis;
