/*****************************************************************************
 *
 * Module dependencies
 * 
 * @author dkilcy
 * 
 ****************************************************************************/

console.log( 'info', "Start of application." );

var global = require('./global.js');

var express = require('express');
var http = require('http');
var io = require('socket.io'); 

var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/', express.static(global.configuration.webapp.rootDir));

var db = require('mongode').connect(global.configuration.mongodb.url);

var server = http.createServer(app);

var routes = require('./routes');
routes(app,db,
	io.listen(server)); // Routes for our application


server.listen(8080, function() { 	
	console.log('listening on http://localhost:8080');
});


