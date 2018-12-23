'use strict'

let route = {};


route.registration = {
    method: require('./route/registration'),
    auth: false
};

route.authorization = {
    method: require('./route/authorization'),
    auth: false
};

route.homeUploadInfo = {
    method: require('./route/homeUploadInfo'),
    auth: false
};

route.personalUploadInfo = {
    method: require('./route/personalUploadInfo'),
    auth: true
};

route.personalUpdateAvatar = {
    method: require('./route/personalUpdateAvatar'),
    auth: true
};

route.personalBuyCoins = {
    method: require('./route/personalBuyCoins'),
    auth: true
};

route.personalSaleCoins = {
    method: require('./route/personalSaleCoins'),
    auth: true
};

route.marketUploadInfo = {
    method: require('./route/marketUploadInfo'),
    auth: true
};

route.marketBuyCoins = {
    method: require('./route/marketBuyCoins'),
    auth: true
};

route.historyUploadInfo = {
    method: require('./route/historyUploadInfo'),
    auth: true
};

route.logout = {
    method: require('./route/logout'),
    auth: true
};


module.exports = route;
