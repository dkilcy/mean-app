/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    "use strict";

    this.greeting = function(req, res, next) {
		res.json({
		    id:1, content:'foo'
		});
    };
}

module.exports = ContentHandler;