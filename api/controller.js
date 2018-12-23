'use strict'

const route = require('./route');
const storageSessions = require('../lib/storage/sessions');


const controller = async (message, ws) => {
    let request;

    try {
        console.log("\nRequest:", message);
        request = JSON.parse(message);
    } catch (err) {
        console.log('Error: parsing request!', err);
        ws.send(JSON.stringify({
            error: {
                message: 'Error: Invalid request!'
            }
        }));
    };

    let res = { ruid: request.ruid };

    try {
        if (!route[request.method])
            throw new Error("Error: unknown method!");

        const { method, auth } = route[request.method];

        if (auth) {
            const token = ws.token;
            if (!token)
                throw new Error("Error: token not found!");
            const userId = await storageSessions.getUserIdByToken(token);
            if (!userId)
                throw new Error("Error: session with such a token does not exist (incorrect token, session is completed)!");
            request.data.userId = userId;
        };

        res.method = method;
        res.data = await method(request.data, ws);
    } catch (err) {
        console.log(err);
        res.data = {
            error: {
                message: err.message
            }
        };
    };

    const response = JSON.stringify(res);
    console.log("Response:", response);

    ws.send(response);
};


module.exports = controller;
