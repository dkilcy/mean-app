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
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/', express.static(global.configuration.webapp.rootDir));

var db = require('mongode').connect(global.configuration.mongodb.url);

var routes = require('./routes');
routes(app,db); // Routes for our application

app.listen(8080, function() { 	
	console.log('listening on http://localhost:8080');
});
