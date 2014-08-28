/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/

var global = require('../global.js');

var WidgetsDAO = require('../widgets').WidgetsDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db, io) {
    "use strict";

    var widgets = new WidgetsDAO(db); 
	
	//===============================================================
	
    this.greeting = function(req, res, next) {
		res.json({ id:1, content:'foo' });		
		io.sockets.emit('testEvent', { hello:'world' } );		
    };
    
    //===============================================================
    
    this.getWidgets = function(req, res, next) {
    	widgets.getWidgets( function(err, data) {
    		console.dir(data);    	
    		return res.json( data ); 
    	});    	
    };
    
    this.postWidget = function(req, res, next) {    	
    	var widget = req.body;     	
    	console.log("user submitted widget for post: " + widget.name );     	
    	widgets.addWidget( widget, function(err, data ) {
    		return res.json( data ); 
    	});
    };
    
    this.deleteWidget = function(req, res, next) {    	
    	var id = req.query.id;    	
    	console.log("deleteWidget: req.query.id=" + id ); 
    	//console.dir(req);    	
    	widgets.deleteWidget( id, function(err, data ) {
    		return res.json( data ); 
    	});    	
    };
}

module.exports = ContentHandler;