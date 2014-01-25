'use strict';

/**********************************************************************************
 * AngularJS Directives
 * 
 * @dkilcy
 * 
 **********************************************************************************/

var app = angular.module('demoApp'); // retrieve existing module declared in app.js

angular.module('demoApp.directives', [])
.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('ngConfirmClick', [
     function(){
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Are you sure?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if ( window.confirm(msg) ) {
                         scope.$eval(clickAction)
                     }
                 });
             }
         };
 }])
