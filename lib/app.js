#!/usr/bin/env node
/**
 * @license
 *(c) Copyright 2016 ifootmark. Some Rights Reserved. 
 * fm-node-proxy
 * https://github.com/ifootmark/fm-node-proxy
 * @author ifootmark@163.com
 */

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
    var port = server.address().port;
    console.log('Reverse Proxy listening at port %s', port);
});