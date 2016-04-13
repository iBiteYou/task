var http = require("http");
//var express = require("express");
//var app = express();

server = http.createServer();
server.on('request',function(req,res){
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('<p>hello world</p>');
});
server.listen(8585)
