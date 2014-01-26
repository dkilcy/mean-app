/**
 * http://blog.auth0.com/2014/01/07/angularjs-authentication-with-cookies-vs-token/
 */
var app = angular.module('meanApp');

/**
 * 
 */
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

/**
 * 
 */
app.factory('authInterceptor', function ($rootScope, $q, $window) {

  console.log("authInterceptor(): entry.  token=" + $window.sessionStorage.token ); 
  
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Basic ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

