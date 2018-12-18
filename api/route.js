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
    auth: false
};

route.personalUpdateAvatar = {
    method: require('./route/personalUpdateAvatar'),
    auth: false
};

route.personalBuyCoins = {
    method: require('./route/personalBuyCoins'),
    auth: false
};

route.personalSaleCoins = {
    method: require('./route/personalSaleCoins'),
    auth: false
};

route.marketUploadInfo = {
    method: require('./route/marketUploadInfo'),
    auth: false
};

route.marketBuyCoins = {
    method: require('./route/marketBuyCoins'),
    auth: false
};

route.historyUploadInfo = {
    method: require('./route/historyUploadInfo'),
    auth: false
};

route.logout = {
    method: require('./route/logout'),
    auth: false
};


module.exports = route;
