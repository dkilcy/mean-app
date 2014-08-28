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
	var credentials = {};
	
	this.login = function(user) {    
		
    	var deferred = $q.defer();
    	$http.post('/login', user).success(function(data) {	
    		deferred.resolve(data);
			authenticated = true;
			credentials = data; 
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

		var deferred = $q.defer();
    	$http.post('/logout').success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;    
    };
    
    this.username = function() {
    	return credentials._id;
    };
    
    this.isAuthenticated = function() {
    	return authenticated; 
    };
    
    this.credentials = function() {
    	return credentials;
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

