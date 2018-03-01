/*globals angular */
'use strict';
angular.module('FarmFridgeInterview')
.controller('StatsController',['$scope', '$http', '$timeout', '$window', function($scope,$http,$timeout,$window){
	google.charts.load( 'current', {
		'packages': [ 'controls','corechart','table' ]
	} );

	function getVisitorData(){
		var visitorData = getData('visitors');
		visitorData.then(function(dataSet){
			//createDataTable(dataSet,"headline","visitors");
			//createDataTable(dataSet,"button","visitors");
			createDataTable(dataSet,"combo","visitors");
		},function(){
			$timeout( function () {
				$window.location.reload();
			}, 2000 );
		});
	}

	function getButtonPresserData (){
		var bpData = getData('button_pressers');
		bpData.then(function(dataSet){
			//createDataTable(dataSet,"headline","button-pressers");
			//createDataTable(dataSet,"button","button-pressers");
			createDataTable(dataSet,"combo","button-pressers");
		},function(){
			$timeout( function () {
				$window.location.reload();
			}, 2000 );
		});
	}

	function createDataTable (response, fieldName, prefix){
		var dataSet = response.data;
		var dataObject = {};
		
		fieldName = fieldName || "combo";

		var dataTable = new google.visualization.DataTable({
			cols : [{
				id : fieldName,
				label : "Text",
				type : "string"
			},{
				id : "count",
				label : "Count",
				type : "number"
			}]
		});

		dataSet.forEach(function(d){
			var text = fieldName === "combo" ? (d.headline + "\t-\t" + d.button) : d[fieldName];
			if(dataObject[text]){
				dataObject[text]++;
			}else{
				dataObject[text] = 1;
			}
		});

		Object.keys(dataObject).forEach(function(d){
			dataTable.addRow([d, dataObject[d]]);
		});
		drawChart(dataTable,fieldName,prefix);
	}
	function drawChart(dataTable, fieldName, prefix){
		var pieChart = new google.visualization.PieChart( document.getElementById( prefix + "-" + fieldName + '-pie-chart-div' ) );
		var tableChart = new google.visualization.Table( document.getElementById( prefix + "-" + fieldName + '-table-div' ) );
		pieChart.draw( dataTable, {
			legend : {
				position : "none"
			},
			width:"100%",
			height:400
		} );
		tableChart.draw( dataTable, {
			page : "enable",
			pageSize : 20,
			sortColumn : 1,
			sortAscending : false,
			width : "100%",
			cssClassNames : {
				headerRow : "thead-dark",
				tableRow : "tr-dark",
				oddTableRow : "tr-odd-dark",
				hoverTableRow : "tr-hover-dark",
				selectedTableRow : "tr-selected-dark"
			},
		} );
	}

	function getData(tableName){
		return $http.get('/data/' + tableName);
	}
	google.charts.setOnLoadCallback( getVisitorData );
	google.charts.setOnLoadCallback( getButtonPresserData );

}]);