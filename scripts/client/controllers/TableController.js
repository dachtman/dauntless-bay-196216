/*globals google angular*/
'use strict';
angular.module('FarmFridgeInterview')
.controller('TableController',['$scope','$window','$http','$timeout',function($scope,$window,$http,$timeout){
	const pathName = window.location.pathname.toString();
	google.charts.load('current', {'packages':['table']});
	google.charts.setOnLoadCallback(getData);
	
	function getData(){
		var tableName = pathName == "/visitors" ? "visitors" : "button_pressers";
		$http.get("/data/" + tableName).then(function(response){
			drawTable(response.data);
		},function(response){
			$scope.loading = false;
			console.error(response);
			$timeout(function(){
				$window.location.reload();
			},2000);
		})
	}
	
	function drawTable(dataSet){
		var chart = new google.visualization.DataTable();
		chart.addColumn('string', 'IP');
		chart.addColumn('string', 'Timestamp');
		chart.addColumn('string', 'Headline');
		chart.addColumn('string', 'Button');
		dataSet.forEach(function(d){
			chart.addRow([d.ip_address,d.timestamp,d.headline,d.button]);
		});
		var table = new google.visualization.Table(document.getElementById('chart-div'));
        table.draw(chart, {showRowNumber: true, width: '100%', height: '100%'});
	}
}]);