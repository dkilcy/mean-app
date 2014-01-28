/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/

var global = require('../global.js');

var WorkflowDAO = require('../workflow').WorkflowDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    "use strict";

    var workflow = new WorkflowDAO(db);
    
	this.hiringManager = function(req, res, next) {
		
	};
	
	this.itManager = function(req, res, next) {
		
	};
	
	this.hrManager = function(req, res, next) {
		
	};
	
	this.applicant = function(req, res, next) {
		
	};
	
	//===============================================================
	
    this.greeting = function(req, res, next) {
		res.json({
		    id:1, content:'foo'
		});
    };
}

module.exports = ContentHandler;