/*globals angular */
'use strict';
angular.module('FarmFridgeInterview')
.controller('HomeController',['$scope','$http','$timeout','$window',function($scope,$http,$timeout,$window){
	$scope.loading = true;
	$scope.show_data_addded_bar = false;
	$scope.button_pressed = false;
	$scope.display_text = {
		headline : "",
		button : ""
	};
	$http.get("/data/text").then(function(response){
		var dataSet = response.data;
		if(dataSet.length > 1){
			$scope.display_text.headline = dataSet[0].text;
			$scope.display_text.button = dataSet[1].text;
			storeVisitor(dataSet[0].text,dataSet[1].text);
			$scope.loading = false;
		}else{
			$window.location.reload();
		}
	},function(response){
		$scope.loading = false;
		console.error(response);
		$timeout(function(){
			$window.location.reload();
		},2000);
	});
	
	$scope.reloadPage = function(){
		$window.location.reload();
	}
	
	$scope.storeButtonClick = function(){
		$http.post("/data/button_pressers",{
			headline : $scope.display_text.headline,
			button : $scope.display_text.button,
			timestamp : new Date().toLocaleString()
		}).then(function(resp){
			$scope.show_data_addded_bar = true;	
			$scope.button_pressed = true;
			$timeout(function(){
				$scope.show_data_addded_bar = false;
			},5000);
		},function(resp){
			console.error(resp);
		});
	};
	
	function storeVisitor(headline,button){
		$http.post("/data/visitors",{
			headline : headline,
			button : button,
			timestamp : new Date().toLocaleString()
		}).then(function(resp){},function(resp){});		
	}
}]);