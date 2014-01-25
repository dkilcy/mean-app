'use strict';

/************************************************************************************
 * AngularJS Services
 * Services (and Factories) are singletons. 
 * They are instantiated on demand.
 * 
 * @author dkilcy
 * 
 ***********************************************************************************/

var app = angular.module('demoApp'); // retrieve existing module declared in app.js

angular.module('demoApp.services', []).value('version', '0.1');

/**
 * This class performs basic authentication of a user
 * 
 */
app.factory( "authService", ['$http','$q', '$window', function($http,$q,$window) {

	var authenticated = false; 
	
	var login = function(credentials) {    

    	var deferred = $q.defer();
    	$http.post('/login', credentials).success(function(data) {	
    		deferred.resolve(data);
			authenticated = true;
			$window.sessionStorage.token = data.token;
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};
	
	var signup = function(user) {    
		
    	var deferred = $q.defer();
    	$http.post('/signup', user).success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;
	};
	
	var logout = function() {

    	delete $window.sessionStorage.token;
    	authenticated = false;
    	
		var deferred = $q.defer();
    	$http.post('/logout').success(function(data) {    		
    		deferred.resolve(data);
    	}).error(function(reason) {
    		return deferred.reject(reason);        			
    	});
    	return deferred.promise;    
    };
    
    return {   
    	signup: signup,
        login: login,         
        logout: logout,        
        authenticated: function() {	return authenticated; }    	
    };
}]);

/***********************************************************************************/

app.factory('restService', [ '$http', '$q', function($http,$q) {
	
	var greetings = function() {		
		var deferred = $q.defer();
        $http.get('/greeting').success(function(data) {
        	console.log('info',"data=" + data.id + " " + data.content);        
        	deferred.resolve(data);
        })
        .error(function(reason) {
			return deferred.reject(reason);       
		});
        return deferred.promise;
	};
	
	return {
		greetings: greetings		
	};
}]);

/**********************************************************************************
 * Simple factories for demo and experimentation
 * http://www.youtube.com/watch?v=i9MHigUZKEM
 **********************************************************************************/

app.factory('widgetFactory', [ function() {
	var widgets = [ { id:1, name:"Alpha", description:"Test1 Widget" }, 
			 	      { id:2, name:"Bravo", description:"Test2 Widget" },
				      { id:3, name:"Charlie", description:"Test3 Widget" }
				    ]; 
	
	var factory = {};
	factory.getWidgets = function() {
		 // AJAX call 
		return widgets;
	};
	factory.addWidget = function( widget ) { 
		widgets.push(widget);
	};
	factory.deleteWidget = function( widget ) {
		widgets.splice(widgets.indexOf(widget),1);   
	};
	
	return factory;
}]);
