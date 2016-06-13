'use strict';
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fmconfig = require('../fm.config.js');
var hostName = fmconfig.api_hostName, 
    port = fmconfig.api_port,
    prefix=!!fmconfig.proxy_prefix?fmconfig.proxy_prefix+"/":"";

//https://nodejs.org/api/http.html#http_http_request_options_callback
exports.proxy = function(req, res) {
    var reg=new RegExp(prefix,"gmi");
    var path = req.path.replace(reg, "");
    if(req.method == "GET"){
        var params = {};
        params = url.parse(req.url,true).query;
        var search='?'+querystring.stringify(params);
        var options = {
            hostname: hostName,
            port: port,
            path: path + search,
            method: req.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': querystring.stringify(params).length
            }
        };

        httpRequest(options, params);

    }else if(req.method == "POST"){
        req.setEncoding('utf-8');
        var postdata = "";
        req.addListener("data",function(postchunk){
            postdata += postchunk;
        })
        req.addListener("end",function(){
            var params = querystring.parse(postdata);
            var options = {
                hostname: hostName,
                port: port,
                path: path,
                method: req.method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': querystring.stringify(params).length
                }
            };

            httpRequest(options, params);
        })
    }

    function httpRequest(options, params) {
        var request = http.request(options, function(response) {
            if (response.statusCode != 200) {
                res.status(response.statusCode).end();
                return;
            }

            response.setEncoding('UTF-8');
            response.on('data', function(data) {
                var obj = JSON.parse(data)
                res.send(obj);
                console.log(obj);
            });
        });

        request.write(querystring.stringify(params));
        request.end();
    }
};