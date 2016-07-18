'use strict';
var express = require('express');
var bodyParser = require("body-parser");
var url = require("url");
var querystring = require("querystring");
var fmconfig = require('../fm.config.js');
var port = fmconfig.api_port,
    api_prefix = !!fmconfig.api_prefix?fmconfig.api_prefix:"";
var app = express();

// need it...  
//app.use(bodyParser.urlencoded({ extended: false }));

var get_handle = function(req,res){
    var params = [];
    params = url.parse(req.url,true).query;
    res.send(JSON.stringify(params));
    /*res.setHeader('Content-Type', 'text/plain');  
    res.setHeader('Content-Length', JSON.stringify(params).length);
    res.write(JSON.stringify(params));
    res.end();*/
}

var post_handle = function(req,res){
    req.setEncoding('utf-8');
    var postdata = "";
    req.addListener("data",function(postchunk){
        postdata += postchunk;
    })
    req.addListener("end",function(){
        var params = querystring.parse(postdata);
        res.send(JSON.stringify(params));
        /*res.setHeader('Content-Type', 'text/plain');  
        res.setHeader('Content-Length', JSON.stringify(params).length);
        res.write(JSON.stringify(params));
        res.end();*/
    })
}

var server = {
    start:function(){
        app.get('/'+api_prefix+'*', get_handle);
        app.post('/'+api_prefix+'*', post_handle);

        app.listen(port);  
        console.log('Server listening on port '+port);
    }
};
module.exports = server;