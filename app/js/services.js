'use strict';

/************************************************************************************
 * AngularJS Services
 * Services (and Factories) are singletons. 
 * They are instantiated on demand.
 * 
 * @author dkilcy
 * 
 ***********************************************************************************/

var app = angular.module('meanApp'); // retrieve existing module declared in app.js

angular.module('meanApp.services', []).value('version', '0.1');

/**
 * This class performs basic authentication of a user
 * 
 */
app.service( "authService", ['$http','$q', '$window', function($http,$q,$window) {

	var authenticated = false; 
	var username = {};
	
	this.login = function(credentials) {    
		
    	var deferred = $q.defer();
    	$http.post('/login', credentials).success(function(data) {	
    		deferred.resolve(data);
			authenticated = true;
			username = credentials.username;
			$window.sessionStorage.token = data.token;
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};

	this.signup = function(user) {    
		
    	var deferred = $q.defer();
    	$http.post('/signup', user).success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};
	
	this.logout = function() {

    	authenticated = false;
    	return {
    		addWidget : addWidget,
    		deleteWidget : deleteWidget,
    		getWidgets : getWidgets
    	};
		var deferred = $q.defer();
    	$http.post('/logout').success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;    
    };
    
    this.username = function() {
    	return username;
    };
    
    this.isAuthenticated = function() {
    	return authenticated; 
    };

}]);

/***********************************************************************************
 * 
 * 
 */
app.service('restService', [ '$http', '$q', function($http,$q) {
	
	this.greetings = function() {		
		var deferred = $q.defer();
        $http.get('/api/greeting').success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(reason) {
			return deferred.reject(reason);       
		});
        return deferred.promise;
	};
;
}]);

/**
 * 
 */
app.factory('workflowFactory', [ function() {
	
	var workflowModel = {};	
	var factory = {};
	
	var init = function() {
		workflowModel = { "_id":"hr", "name":"HR Workflow Model", 
					"role": [ 	
					{ "_id":"hiringManager", 	"name":"Hiring Manager" },
					{ "_id":"itManager", 		"name":"IT Manager" },
					{ "_id":"hrManager", 		"name":"HR Manager" },
					{ "_id":"applicant", 		"name":"Applicant" } ],
						
					"workflow": [
					{ "_id":1, "from":"applicant", "to":"hiringManager" }, 
					{ "_id":2, "from":"hiringManager", "to":"hrManager" }, 				
					{ "_id":3, "from":"hrManager", "to": "applicant" },			
					{ "_id":4, "from":"applicant", "to":"hrManager" },
					{ "_id":5, "from":"hrManager", "to":"itManager" } ] };
	};
	
	init();
	
	factory.getWorkflowModel = function() {
		return workflowModel;
	};
	
	return factory;
	
}]);

/**
 * 
 */
app.service('workflowService', [ '$http', '$q', function($http,$q) {
	
	this.getWorkflow = function(id) {
		var deferred = $q.defer();
    	$http.get('/api/workflow?id=' + id).success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};
	
}]);

/**
 * 
 */
app.service('widgetService', [ '$http', '$q', function($http,$q) {
	
	this.getWidgets = function() {
		var deferred = $q.defer();
    	$http.get('/api/widgets').success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
 
	};
	this.addWidget = function(widget) {
		var deferred = $q.defer();
    	$http.post('/api/widgets', widget).success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};
	
	this.deleteWidget = function(widget) {
		var deferred = $q.defer();
    	$http.delete('/api/widgets?id=' + widget.name).success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};
	
}]);

/**********************************************************************************
 * Simple factories for demo and experimentation
 * http://www.youtube.com/watch?v=i9MHigUZKEM
 **********************************************************************************/

