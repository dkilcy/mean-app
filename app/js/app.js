'use strict';

var app = angular.module('meanApp', 
	[
	  'ngRoute',
	  'ui.bootstrap',
	  'ngGrid',
	  'meanApp.filters',
	  'meanApp.services',
	  'meanApp.directives',
	  'meanApp.controllers'
	]);

/**********************************************************************************
 * Module with config and route 	
 **********************************************************************************/
app.config( ['$provide', '$routeProvider', function($provide, $routeProvider) {
	
	$provide.factory('$routeProvider', function () {
        return $routeProvider;
    });
	
	$routeProvider.when('/home',{ templateUrl: 'partials/home.html' });
	$routeProvider.when('/signup', { templateUrl: 'partials/signup.html', controller: 'authController'});
	$routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: 'authController' });
	$routeProvider.when('/tour', { templateUrl: 'partials/tour.html'});
	$routeProvider.when('/about', { templateUrl: 'partials/about.html' });
	$routeProvider.when('/help', { templateUrl: 'partials/help.html'});
	
	$routeProvider.when('/account', { templateUrl: 'partials/account.html'});
	
	$routeProvider.when('/dashboard',{ templateUrl: 'partials/dashboard.html', controller: 'dashboardController' });

	$routeProvider.when('/widgets',{ templateUrl: 'partials/widgets.html', controller: 'widgetController' });	
	$routeProvider.when('/widgets/view1',{ templateUrl: 'partials/widgets/view1.html', controller: 'widgetController' });
	$routeProvider.when('/widgets/view2',{ templateUrl: 'partials/widgets/view2.html', controller: 'widgetController' });
	
	$routeProvider.otherwise({ redirectTo: '/home'});
	
}]);

//******************************************************************************************

var AUTH_SERVICE = "authService";  // can only pass constants into app.run()
var WORKFLOW_FACTORY = "workflowFactory"; 

app.run( ['$rootScope', '$location', '$routeProvider', AUTH_SERVICE,function($rootScope, $location, $routeProvider, AUTH_SERVICE) {

    $rootScope.authService = AUTH_SERVICE;

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
    	
        var routesThatRequireAuth = ['/dashboard', '/widgets', '/account'];
        var route = $location.path();
        
        var username = AUTH_SERVICE.username();
        var authenticated = AUTH_SERVICE.isAuthenticated();
        
        for( var i=0; i < routesThatRequireAuth.length; i++) {   	
        	//console.log('log', 'authenticated=' + authenticated + " route=" + route + ' for user=' + username + ' check=' + routesThatRequireAuth[i] );
        	if( route.startsWith(routesThatRequireAuth[i])  && !authenticated ) {
    	    	//console.log('log', 'redirecting from ' + route + ' to /login for user=' + username );
    	        $location.path('/login');	     
    	    }
        }
    });    
    
    var init = function() {

    };
    
    init();
    
    
}]);

