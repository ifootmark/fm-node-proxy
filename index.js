'use strict';

var express = require('express');
var app = express();
var nodeproxy=require("./lib/proxy");
var fmconfig = require('./fm.config.js');
var proxy_prefix=!!fmconfig.proxy_prefix?fmconfig.proxy_prefix+"/":"",
    proxy_port=fmconfig.proxy_port;

var proxy = {
    start:function(){
        app.get('/'+proxy_prefix+'*', nodeproxy.proxy);
        app.post('/'+proxy_prefix+'*', nodeproxy.proxy);

        var server = app.listen(proxy_port, function () {
            var port = server.address().port;
            console.log('Reverse Proxy listening at port %s', port);
        });
    }
};
module.exports=proxy;
