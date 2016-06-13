'use strict';
var express = require('express');
var app = express();
var nodeproxy=require("./proxy");
var fmconfig = require('../fm.config.js');
var proxy_prefix=!!fmconfig.proxy_prefix?fmconfig.proxy_prefix+"/":"",
    proxy_port=fmconfig.proxy_port;

app.get('/'+proxy_prefix+'*', nodeproxy.proxy);
app.post('/'+proxy_prefix+'*', nodeproxy.proxy);

var server = app.listen(proxy_port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Proxy listening at http://%s:%s', host, port);
});