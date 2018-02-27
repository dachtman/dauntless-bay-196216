/*globals angular */
'use strict';
angular.module('FarmFridgeInterview')
.controller('NavController',['$scope','$window',function($scope,$window){
	var pathName = $window.location.pathname.toString();
	$scope.locations = [{
		name : "Home",
		url : "/",
		active : pathName === "/"
	},{
		name : "Visitors",
		url : "/visitors",
		active : pathName === "/visitors"
	},{
		name : "Button Pressers",
		url : "/button_pressers",
		active : pathName === "/button_pressers"
	}];
}]);