'use strict';

var options = {
    proxy_port: 5000,
    proxy_prefix: "api/",
    api_hostName: "127.0.0.1",
    api_port: 8080,
    api_prefix: 'proxy/'
};

try{
    var config = require('../../fm.config.js');
    for(var key in options){
        if (config[key] === undefined || config[key] === null) {
            config[key] = options[key];
        }
    }
    module.exports = config;
}catch(e){
    module.exports = options;
}