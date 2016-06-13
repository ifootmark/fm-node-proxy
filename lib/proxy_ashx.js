'use strict';
var express = require('express');
var bodyParser = require("body-parser");
var url = require("url");
var querystring = require("querystring");
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

app.get('/proxy/*', get_handle);
app.post('/proxy/*', post_handle);

//除了app.get、app.post这种形式外，还可以采用：app.all在这里all表示get,post等任何一种请求方式。
//或者app['get']('/path', function(req,res));

//调用app.listen()方法
app.listen(8080);  
console.log('Listening on port 8080');