/*globals angular */
'use strict';
angular.module( 'FarmFridgeInterview' )
	.directive( 'ffNavbar', function () {
		return {
			restrict: "E",
			controller: "@",
			name: "controllerName",
			templateUrl: "/templates/Navbar.html"
		};
	} );