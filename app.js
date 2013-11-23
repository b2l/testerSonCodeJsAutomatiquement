/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var connect = require('connect');

/** 
 * Configuration
 */


app.use(express.bodyParser());
app.use(connect.compress());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/_packaged', { maxAge: 10000 }));
app.use(express.static(__dirname + '/client/src/css', { maxAge: 10000 }));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var elements = [];

app.get('/', function (req, res) {
    res.sendfile('client/src/html/index.html');
});

app.get('/elements', function (req, res) {
    res.json(elements);
});

app.post('/element', function (req, res) {
    elements.push(req.body.value);
    res.send();
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on http://localhost:'+ port);
});
 
