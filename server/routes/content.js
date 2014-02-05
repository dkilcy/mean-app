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
	
	this.getWorkflowModel = function(req, res, next) {

		var id = req.query.id;    	
    	console.log("content.js: getWorkflowModel: req.query.id=" + id );
    	
		workflow.getWorkflowModel(id, function(err, data) { 
			if( err ) {
				console.log('err', err ); 
				// TODO
			}
			console.dir(data);
			return res.json( data ); 
		});
	};
	
	//
	
	this.addWorkflow = function(req, res, next ) {
		
	};
	
	this.getWorkflow = function(req, res, next ) {
		var role = req.query.role;
		var username = req.query.username;
		var id = req.query.id; 
		var status = req.query.status;
		
		console.log("content.js: getWorkflow: role=" + role + " username=" + username + " id=" + id + " status=" + status ); 
		
		workflow.getWorkflow( role, username, id, status, function( err, data ) {
			if( err ) {
				console.log('err', err ); 
				// TODO
			}
			//console.dir(data);
			return res.json(data); 
		});	
	};
	
	this.updateWorkflow = function(req, res, next ) {
		
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