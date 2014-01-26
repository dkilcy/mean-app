/**
 * 

}
**/

function workflow() {
	
	var model = { "_id":"hr", "name":"HR Workflow Model", 
			"role": [ 	
			{ "_id":"hiringManager", 	"name":"Hiring Manager" },
			{ "_id":"itManager", 		"name":"IT Manager" },
			{ "_id":"hrManager", 		"name":"HR Manager" },
			{ "_id":"applicant", 		"name":"Applicant" } ],
				
			"workflow": [
			{ "_id":1, "from":"applicant", "to":"hiringManager" }, 
			{ "_id":2, "from":"hiringManager", "to":"hrManager" }, 				
			{ "_id":3, "from":"hrManager", "to":["itManager", "applicant"] },
			{ "_id":4, "from":"applicant", "to":"hrManager" },
			{ "_id":5, "from":"itManager", "to":"hrManager" } ]
		};
		
	
};