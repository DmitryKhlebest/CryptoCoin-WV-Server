'use strict'

const route = require('./route');
const storageSessions = require('../lib/storage/sessions');


const controller = async (message, ws) => {
    let request;

    try {
        request = JSON.parse(message);
        console.log("\nRequest:", request);
    } catch (err) {
        console.log('Error: parsing request!', err);
        ws.send(JSON.stringify({
            error: {
                message: 'Error: Invalid request!'
            }
        }));
    }

    let response = { ruid: request.ruid };

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
            request.data = userId;
        }

        response.method = method;
        response.data = await method(request.data, ws);
    } catch (err) {
        console.log(err);
        response.data = {
            error: {
                message: err.message
            }
        }
    }

    console.log("Response:", response);

    ws.send(JSON.stringify(response));
};


module.exports = controller;
