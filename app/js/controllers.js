'use strict';

/************************************************************************************
 * AngularJS Controllers
 * @author dkilcy 
 ***********************************************************************************/

var app = angular.module('meanApp'); // retrieve existing module declared in app.js

angular.module('meanApp.controllers', []);

app.controller('authController', ['$scope', '$window', '$location', 'authService', function ($scope, $window, $location, authService) {
	
	$scope.credentials = {username: 'user', password: 'password'};

	$scope.login = function(credentials) { 

		$scope.isDisabled = true; // disable the Login button
		// login returns a promise
		authService.login(credentials).then(function(data) {
			$scope.credentials = credentials;
			$location.path('/dashboard');
			//$scope.isDisabled = false; // enable the login button
		}, function(reason) { // promise rejected				 
			console.log('error', reason);
			$scope.error = reason;
			$scope.isDisabled = false; // enable the login button
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

		$scope.isDisabled = true; // disable the Login button
		authService.signup(user).then(function(user) {
			$location.path('/login');
		}, function(reason) { // promise rejected									 
			console.log('error', reason);
			$scope.error = reason;
			$scope.isDisabled = false; // enable the login button
		});
	};
	
}]);


app.controller('roleController', ['$scope', '$location', 'workflowFactory', 'authService', function($scope, $location, workflowFactory, authService) {
	
	var currentPath = $location.path();		
	var currentRole = currentPath.split("/")[2];
	var currentUsername = authService.username();
	
	$scope.currentPath = currentPath;
	$scope.currentRole = currentRole; 
	$scope.currentUsername = currentUsername;
	
	init(); 
	
	function init() {
		
	};
	
}]);


app.controller('dashboardController', ['$scope', 'workflowFactory', 'authService', function($scope, workflowFactory, authService) {
	
	$scope.workflowModel = {};
	
	init(); 
	
	function init() {
		$scope.workflowModel = workflowFactory.getWorkflowModel();
	};
	
}]);

app.controller('widgetController', ['$scope', 'widgetFactory', 'restService', function($scope, widgetFactory, restService) {

	$scope.message = 'Empty Message';
	$scope.categories = [ { '_id':'open', 'name':'Open'},
	                      { '_id':'requested', 'name':'Requested'},
	                      { '_id':'pending', 'name':'Pending'},
	                      { '_id':'approved', 'name':'Approved' },	                      
	                      { '_id':'denied', 'name':'Denied' },	                      
	                      { '_id':'cancelled', 'name':'Cancelled' } ] ;
	
	$scope.category = $scope.categories[0];
	$scope.widgets = {};
	
	$scope.value1 = true;
	$scope.value2 = false;

	$scope.isDisabled = false;
    $scope.disableClick = function() {
        //alert("Clicked!");
        $scope.isDisabled = true;
        return false;
    };

    $scope.request = { name:"New Employee Software", username:"Art Vandelay" };
    $scope.request.action = { name:"Select Dept. Software"};
    
    $scope.resourceData = [ 
		{group:"Operating System", description:'CentOS 6.5 Linux 32-bit'},
		{group:"Operating System", description:'Mint Cinnamon 23-bit'},
		{group:"Operating System", description:'Windows 7 32-bit'},
        {group:"Operating System", description:'CentOS 6.5 Linux 64-bit'},
        {group:"Operating System", description:'Mint Cinnamon 64-bit'},
        {group:"Operating System", description:'Windows 7 64-bit'},
        {group:"Office", description:'Microsoft Office'},
        {group:"Office", description:'LibreOffice'},
        {group:"Security", description:'WireShark'},
        {group:"Graphics", description:"GNU Image Manipulation Program" },
        {group:"Graphics", description:"LibreOffice Draw"},
        {group:"Graphics", description:"Microsoft Visio" },
        {group:"Graphics", description:"Adobe Photoshop" },
        {group:"Graphics", description:"Adobe Flash" },
        {group:"Development", description:"Git"},
        {group:"Development", description:"Spring Tool Suite" },
        {group:"Development", description:"Oracle 7 JDK 32-bit" },
        {group:"Development", description:"Oracle 7 JDK 64-bit" },
        {group:"Development", description:"Oracle 8 JDK 64-bit" },
        {group:"Development", description:"GCC Compiler" }
        
     ];
    
    $scope.resourceSelection = [];
    
    var resourceColumnDefs = [ {field:'group', displayName:'Group'}, 
	    {field:'description', displayName:'Description'} ];

    $scope.resourceGrid = { 
    		data: 'resourceData',
    		columnDefs: resourceColumnDefs,
    		selectedItems: $scope.resourceSelection,
    	    multiSelect: true
    };
    
    var datex = new Date();
    
    $scope.incomingData = [{date:datex , requestName: "New Request for 0123456789 0123456789", role:"applicant", status:"Open"},
                     {date: datex, requestName: "New Request for 0123456789 0123456789", role:"hrManager", status:"Open"},
                     {date: datex, requestName: "New Request for 0123456789 0123456789", role:"hiringManager", status:"Open" }];
    
    $scope.outgoingData = [{date: datex, requestName: "New Request for 0123456789 0123456789t", role:"hrManager", status:"Open"},
                           {date: datex, requestName: "New Request for 0123456789 0123456789", role:"itManager", status:"Open"},
                           {date: datex, requestName: "New Request for 0123456789 0123456789", role:"itManager", status:"Acknowledged"},
                           {date: datex, requestName: "New Request for 0123456789 0123456789", role:"itManager", status:"Open"},
                           {date: datex, requestName: "New Request for 0123456789 0123456789", role:"itManager", status:"Open"}];
    
    $scope.incomingSelection = [];
    $scope.outgoingSelection = [];
    
    var columnDefs = [{field:'date', displayName:'Date/Time'}, 
	    {field:'requestName', displayName:'Request'}, 
	    {field:'role', displayName:'Role'},
	    {field:'status', displayName:'Status', cellTemplate: '/partials/cellTemplate.html' }];

    $scope.incomingGrid = { 
    		data: 'incomingData',
    		columnDefs: columnDefs,
    		selectedItems: $scope.incomingSelection,
    	    multiSelect: false
    };
    $scope.outgoingGrid = { 
    		data: 'outgoingData',
    		columnDefs: columnDefs,
    		selectedItems: $scope.outgoinggSelection,
    	    multiSelect: false
    };
    
	init(); 
	
	function init() {
		restService.greetings().then( function(data) {
			$scope.message = "REST completed";
			$scope.greeting = data;			
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});
		$scope.widgets = widgetFactory.getWidgets();
	};
	
	$scope.addWidget = function(data) {
		widgetFactory.addWidget(data);
	};
	
	$scope.deleteWidget = function(data) {
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


