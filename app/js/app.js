'use strict';

var app = angular.module('demoApp', 
	[
	  'ngRoute',
	  'demoApp.filters',
	  'demoApp.services',
	  'demoApp.directives',
	  'demoApp.controllers'
	]);

/**********************************************************************************
 * Module with config and route 	
 **********************************************************************************/
app.config(['$routeProvider', function($routeProvider) {
	
	var workflowModel = { "_id":"hr", "name":"HR Workflow Model", 
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

	for(var i = 0; i < workflowModel.role.length; i++) {
		console.log('info', "adding rule:" + workflowModel.role[i]._id + " " + workflowModel.role[i].name );
		$routeProvider.when("/dashboard/" + workflowModel.role[i]._id, { templateUrl: 'partials/role.html', controller:'dashboardController' });
	}
	
	$routeProvider.when('/home',{ templateUrl: 'partials/home.html' });
	$routeProvider.when('/signup', { templateUrl: 'partials/signup.html', controller: 'authController'});
	$routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: 'authController' });//, resolve: {data: function(Resource) { return Resource.get().$promise; }}
	$routeProvider.when('/tour', { templateUrl: 'partials/tour.html'});
	$routeProvider.when('/about', { templateUrl: 'partials/about.html' });
	$routeProvider.when('/help', { templateUrl: 'partials/help.html'});
	
	$routeProvider.when('/dashboard',{ templateUrl: 'partials/dashboard.html', controller: 'dashboardController' });
	
	$routeProvider.when('/widgets',{ templateUrl: 'partials/widgets.html', controller: 'widgetController' });	
	$routeProvider.when('/widgets/view1',{ templateUrl: 'partials/widgets/view1.html', controller: 'widgetController' });
	
	
	
	$routeProvider.otherwise({ redirectTo: '/home'});
}]);

//******************************************************************************************

var AUTH_SERVICE = "authService";

app.run( ['$rootScope', '$location', AUTH_SERVICE, function($rootScope, $location, AUTH_SERVICE) {

    $rootScope.authService = AUTH_SERVICE;

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
    	
        var routesThatRequireAuth = ['/dashboard', '/widgets'];
        
        //console.log('log', 'authService.authenticated=' + AUTH_SERVICE.authenticated() );

	    if( contains(routesThatRequireAuth, $location.path()) && !AUTH_SERVICE.authenticated() ) {	    	
	        $location.path('/login');	     
	    }
    });
    
}]);

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
