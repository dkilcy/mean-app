'use strict';

/************************************************************************************
 * AngularJS Controllers
 * @author dkilcy 
 ***********************************************************************************/

var app = angular.module('meanApp'); // retrieve existing module declared in app.js

angular.module('meanApp.controllers', []);

app.controller('authController', ['$scope', '$window', '$location', 'authService', function ($scope, $window, $location, authService) {
	
	$scope.credentials = {username: 'dkilcy', password: 'password'};

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
		return authService.isAuthenticated();
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

app.controller('dashboardController', ['$scope', 'workflowService', function($scope, workflowService) {
	
	$scope.workflowModel = {};

	init(); 
		
	function init() {

		 workflowService.getWorkflow( 'hrWorkflow' ).then( function(data) {	
			$scope.workflowModel = data;			
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});	
		
	};
	
}]);

app.controller('roleController', ['$scope', '$location', 'workflowService', 'authService', function($scope, $location, workflowService, authService) {
	
	var currentPath = $location.path();		
	var currentRole = currentPath.split("/")[2];
	var currentUsername = authService.username();
	
	$scope.currentPath = currentPath;
	$scope.currentRole = currentRole; 
	$scope.currentUsername = currentUsername;
	
	$scope.incomingData = {};
		
	$scope.workflowModel = {};
			
	init(); 
		
	function init() {

		 workflowService.getWorkflow( 'hrWorkflow' ).then( function(data) {	
			$scope.workflowModel = data;			
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});	
		
	};
	
}]);

app.controller('widgetController', ['$scope', 'widgetService', 'restService', function($scope, widgetService, restService) {

	$scope.role = { "_id":"hiringManager", "name":"Hiring Manager"};
	
	$scope.message = 'Empty Message';
	$scope.categories = [ { '_id':'open', 'name':'Open'},
	                      { '_id':'requested', 'name':'Requested'},
	                      { '_id':'recalled', 'name':'Recalled' },
	                      { '_id':'pending', 'name':'Pending'},
	                      { '_id':'approved', 'name':'Approved' },	                      
	                      { '_id':'denied', 'name':'Denied' },	                      
	                      { '_id':'cancelled', 'name':'Cancelled' } ] ;
	
	$scope.category = $scope.categories[0];

	$scope.addCategory = function(data) {
		$scope.categories.push(data);
	};
	
	
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
    
    //
    
    var columnDefs = [	{field:'status', 		displayName:'Status', 			width:100,	cellTemplate: '/partials/cellTemplate.html' },
                      	{field:'creationTime', 	displayName:'Creation Time', 	width:200},
                      	{field:'updateTime', 	displayName:'Last Update', 		width:200},              
					    {field:'requestName', 	displayName:'Request', 			width:400}, 
					    {field:'role', 			displayName:'Role', 			width:100},
					    {field:'target', 		displayName:'Target',			width:100}
				    ];

    //
    
    var datex = new Date();
    
    $scope.incomingData = [
                     {creationTime:datex, updateTime:'', requestName: "New Request: Art Vandelay", role:"Applicant", target:'HR Manager', status:"Open"},
                     {creationTime:datex, updateTime:'', requestName: "New Request: 012345678901", role:"Applicant", target:'HR Manager', status:"Open"}
                     ];    
    /**
    {date: datex, requestName: "New Request for 0123456789 0123456789t", role:"hrManager", status:"Open"},
    {date: datex, requestName: "New Request for 0123456789 0123456789", role:"hrManager", status:"Open"},
    {date: datex, requestName: "New Request for 0123456789 0123456789", role:"hrManager", status:"Acknowledged"},
    {date: datex, requestName: "New Request for 0123456789 0123456789", role:"hrManager", status:"Open"},
    {date: datex, requestName: "New Request for 0123456789 0123456789", role:"hrManager", status:"Open"}
    */    
    $scope.incomingSelection = [];
    
    $scope.incomingGrid = { 
    		data: 'incomingData',
    		columnDefs: columnDefs,
    		selectedItems: $scope.incomingSelection,
    	    multiSelect: false,    	   
    	    keepLastSelected : false,
    	    enableColumnResize : true
    };

    $scope.createOutgoingRequest = function() {    	
    	if( $scope.incomingSelection.length > 0 ) {
	    	$scope.incomingSelection[0].updateTime = new Date();
	    	$scope.incomingSelection[0].status = 'Pending';
	    	$scope.outgoingData.push($scope.incomingSelection[0]);    	
	    	$scope.incomingData = _.without( $scope.incomingData, $scope.incomingSelection[0] );
	    	$scope.incomingSelection.length = 0; 
    	}
    };
    
    $scope.cancelIncomingRequest = function() {
    	if( $scope.incomingSelection.length > 0 ) {
    		$scope.incomingData = _.without( $scope.incomingData, $scope.incomingSelection[0] ); 
    		$scope.incomingSelection.length = 0;
    	}
    };
    //listening on http://localhost:8080

    //
    
    $scope.outgoingData = [];    
    $scope.outgoingSelection = [];
    
    $scope.outgoingGrid = { 
    		data: 'outgoingData',
    		columnDefs: columnDefs,
    		selectedItems: $scope.outgoingSelection,
    	    multiSelect: false,
    	    keepLastSelected : false,
    	    enableColumnResize : true
    };
    
    $scope.cancelOutgoingRequest = function() {
    	if( $scope.outgoingSelection.length > 0 ) {
	    	$scope.outgoingSelection[0].updateTime = new Date();
	    	$scope.outgoingSelection[0].status = "Recalled";
	    	$scope.outgoingData = _.without( $scope.outgoingData, $scope.outgoingSelection[0] );
	    	$scope.incomingData.push( $scope.outgoingSelection[0] );    	
	    	$scope.outgoingSelection.length = 0; 
    	}
    };
    
    //
    
	$scope.widgets = {};	
        
	init(); 
	
	function init() {

		var socket = io.connect();
		
		socket.on('testEvent', function (data) {
	    	console.log('testEvent: ' + data.hello );
	    });
		
		//
		
		restService.greetings().then( function(data) {
			$scope.message = "REST completed";
			$scope.greeting = data;			
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});
		
		//

		widgetService.getWidgets().then( function(data) {	
			$scope.widgets = data;			
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});				
	};
	
	$scope.addWidget = function(data) {
		widgetService.addWidget(data).then( function(result) {	
			$scope.widgets.push(result); 
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});
	};
	
	$scope.deleteWidget = function(index) {	
		var data = $scope.widgets[index]; 		
		console.log("index=" + index + " data.name=" + data.name ); 		
		widgetService.deleteWidget(data).then( function(result) {	
			$scope.widgets = _.without( $scope.widgets, data ); 
		}, function(reason) { // promise rejected
			console.log('error', reason);
			$scope.message = reason;
		});
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


