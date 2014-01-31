
function WidgetsDAO(db) {
	"use strict";
	
	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof WidgetsDAO)) {
        console.log('Warning: WidgetsDAO constructor called without "new" operator');
        return new WidgetsDAO(db);
    }

    var widgets = db.collection("widgets");
    
    this.getWidgets = function(callback) {
        widgets.find().toArray( function(err, data) {        			
    		if( err) return callback(err, null ); 
    		console.log("Found " + data.length + " widgets" ); 
    		callback( err, data ); 
        });
    };
    
    this.addWidget = function(data, callback) {
    	console.log("Adding " + data.name );
    	console.dir(data);
    	
    	widgets.insert(data, function (err, result) {            
            if (err) return callback(err, null);
            console.log("Inserted new widget: name=" + data.name );
            callback(err, data);
    	});
    };
    
    this.deleteWidget = function(id, callback) {
    	console.log("Deleting id=" + id );
    	
    	widgets.remove( {'name':id }, function(err,result) {    		
    		if (err) return callback(err, null);
    		console.log("Deleted widget: name=" + id ); 
    		callback( null, id ); 
    	});
    	
    };
}

module.exports.WidgetsDAO = WidgetsDAO;
