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

    var workflowModel = db.collection("workflowModel");
    
    this.getWorkflowModel = function(id, callback) {    	
    	console.log("workflow.js: Locating workflowModel for id=" + id );
    	
        workflowModel.findOne( { '_id': id }, function(err, data) {        	
    		if( err ) return callback(err, null ); 
    		if( data ) {
    			console.log( "workflow.js: Found workflowModel: " +  id ); 
    			callback( null, data ); 
    		}
    		else {
    			callback( { "message":"Workflow model " + id + " does not exist"}, null );
    		}
        });
    };
	
    //
    
    var workflow = db.collection("workflow" );
    
    this.addWorkflow = function( workflow, callback ) {
    	
    };
    
    this.getWorkflow = function( role, username, id, status, callback ) {
    	console.log("workflow.js: getWorkflow: Finding workflow for role=" + role + " username=" + username + " id=" + id + " status=" + status ); 
    	
    	var query = "";
    	
    	if( id != 'null' ) {
    		query = { "_id":id };
    	} 
    	else {
    		query = { "role":role, "username":username, "status":status };
    	}
    	    	
    	workflow.find( query ).toArray( function(err, data) {
    		if( err ) return callback(err, null );
    		if( data ) {
    			console.log("workflow.js: getWorkflow: Found workflow for role=" + role + " username=" + username + " id=" + id + " status=" + status ); 
    			console.dir( data ); 
    			callback( null, data ); 
    		} 
    		else {
    			callback( null, [] ); 
    		}
    	}); 
    	
    };
    
    this.updateWorkflow = function( workflow, callback ) {
    	console.log("workflow.js: updateIncomingWorkflow: " + workflow._id );
    	console.dir( workflow ); 
    	
    	var role = workflow.role;
    	var username = workflow.username;
    	
    	//workflow.update( { "role":role, "username":username } );
    	
    };
    
};

module.exports.WorkflowDAO = WorkflowDAO;