// Calling an already existing module from app.js
var app = angular.module('techAssessmentApp');

app.controller('hospitalController', ['$scope', '$http', function ($scope, $http) {
	
	$http.get('https://data.gov.uk/data/api/service/health/hospitals?county=Hampshire')
		.then(function (response) {
			$scope.hospitals = response.data.result;
			pagination($scope, $scope.hospitals);
		}, function (response) {
			console.log("Error status!")
		})
}]);