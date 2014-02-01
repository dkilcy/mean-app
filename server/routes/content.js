/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/

var global = require('../global.js');

var WorkflowDAO = require('../workflow').WorkflowDAO;
var WidgetsDAO = require('../widgets').WidgetsDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db, io) {
    "use strict";

    var workflow = new WorkflowDAO(db);
    var widgets = new WidgetsDAO(db); 
    
	this.hiringManager = function(req, res, next) {
		
	};
	
	this.itManager = function(req, res, next) {
		
	};
	
	this.hrManager = function(req, res, next) {
		
	};
	
	this.applicant = function(req, res, next) {
		console.log("this.getWidgets: entry" ); 
	};
	
	//===============================================================
	
	this.getWorkflow = function(req, res, next) {

		var id = req.query.id;    	
    	console.log("getWorkflow: req.query.id=" + id );
    	
		workflow.getWorkflow(id, function(err, data) { 
			console.dir(data);
			return res.json( data ); 
		});
	};
	
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