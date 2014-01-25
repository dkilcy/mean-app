/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    "use strict";

    this.greeting = function(req, res, next) {
        "use strict";

        console.log('info', 'user ' + req.body.username  + ' calling /greeting');
		res.json({
		    id:1, content:'foo'
		});
    };
}

module.exports = ContentHandler;