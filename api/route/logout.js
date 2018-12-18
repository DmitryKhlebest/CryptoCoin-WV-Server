'use strict'

const storageSessions = require('../../lib/storage/sessions');


const logout = async (data, ws) => {
    await storageSessions.deleteSession(ws.token);

    delete ws.token;

    return {
        ok: {}
    };
};


module.exports = logout;
