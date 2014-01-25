'use strict';

/************************************************************************************
 * AngularJS Controllers
 * @author dkilcy 
 ***********************************************************************************/

var app = angular.module('demoApp'); // retrieve existing module declared in app.js

angular.module('demoApp.controllers', []);

app.controller('authController', ['$scope', '$window', '$location', 'authService', function ($scope, $window, $location, authService) {
	
	$scope.credentials = {username: 'user', password: 'password'};

	$scope.login = function(credentials) { 

		// login returns a promise
		authService.login(credentials).then(function(data) {
			
			$scope.credentials = credentials;
			$location.path('/dashboard');

		}, function(reason) {
			// promise rejected			
			
			if( reason.status == 401 ) {
				$scope.error = reason.data;
			} else {				 
				console.log('error', reason);
				$scope.error = reason;
			}
		});
	};
	
	$scope.logout = function () {		
		authService.logout();
		$location.path('/home');
	};
		
	$scope.authenticated = function() {		
		return authService.authenticated();
	};
	
	$scope.signup = function(user) {

		authService.signup(user).then(function(user) {
			$location.path('/login');
		}, function(reason) {
			// promise rejected						
			if( reason.status == 401 ) {
				$scope.error = reason.data;
			} else {				 
				console.log('error', reason);
				$scope.error = reason.data;
			}
		});
	};
	
}]);

app.controller('dashboardController', ['$scope', 'restService', function($scope, restService) {
	
	

}]);

app.controller('widgetController', ['$scope', 'widgetFactory', 'restService', function($scope, widgetFactory, restService) {

	$scope.message = 'Empty Message';
	$scope.categories = [ { id:1, name:"Test1" },
	                      { id:2, name:"Test2" }];
	$scope.category = $scope.categories[0];
	$scope.widgets = {};
	
	$scope.value1 = true;
	$scope.value2 = false;

	init(); 
	
	function init() {
		
		restService.greetings().then( function(data) {
			$scope.message = "REST completed";
			$scope.greeting = data;			
		}, function(reason) {
			// promise rejected
			if( reason.status == 401 ) {
				console.log('reason.status=401', reason);
				$scope.message = reason.data;
			} else {				 
				console.log('error', reason);
				$scope.message = reason;
			}
		});
		
		$scope.widgets = widgetFactory.getWidgets();
	};
	
	$scope.addWidget = function(data) {
		widgetFactory.addWidget(data);
	};
	
	$scope.deleteWidget = function(data) {
		console.log('info', 'deleting ' + data.name );

		//var index = $scope.widgets.indexOf(data);
		//$scope.widgets.splice(index,1);
		
		widgetFactory.deleteWidget(data);
		
	};
	
	$scope.addCategory = function(data) {
		$scope.categories.push(data);
	};
	
	
}]);

/*********************************************************************************
 * this is used to parse the profile
 ********************************************************************************/
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}


