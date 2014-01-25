/*****************************************************************************
 *
 * Module dependencies
 * 
 * @author dkilcy
 * 
 ****************************************************************************/

console.log( 'info', "Start of application." );

var express = require('express')
  , app = express() // Web framework to handle routing requests
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes') // Routes for our application
  , global = require('./global.js');

MongoClient.connect(global.configuration.mongodb.url, function(err, db) {
	"use strict";
	
	if(err) throw err;

	app.use(express.json());
	app.use(express.urlencoded());
	
	app.use('/', express.static(global.configuration.webapp.rootDir));

	// Application routes
	routes(app, db); 

	app.listen(8080, function() { 	
		console.log('listening on http://localhost:8080');
	});
	
});

