/**
 * 

}
**/

function WorkflowDAO(db) {
	
	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof WorkflowDAO)) {
        console.log('Warning: WorkflowDAO constructor called without "new" operator');
        return new WorkflowDAO(db);
    }

    var workflow = db.collection("workflow");
    
    this.getWorkflow = function(id, callback) {
    	
    	console.log("Locating workflow for id=" + id );
    	
        workflow.findOne( { '_id': id }, function(err, data) {        	
    		if( err ) return callback(err, null ); 
    		if( data ) {
    			console.log( "Found workflow: " +  id ); 
    			callback( null, data ); 
    		}
    		else {
    			callback( { "message":"Workflow " + id + " does not exist"}, null );
    		}
        });
    };
	
};

module.exports.WorkflowDAO = WorkflowDAO;