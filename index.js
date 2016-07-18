'use strict';

var proxy = require('./lib/app.js');
var server = require('./lib/server.js');
var m = {
    start:function(){
        proxy.start();
    },
    server:{
        start:function(){
            server.start();
        }
    }
};
module.exports = m;