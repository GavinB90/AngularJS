// Creating module.
var app = angular.module('techAssessmentApp',['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
	$routeProvider

	// route for the home page, defaulted to railways-table for now.
		.when('/', {
			templateUrl : 'js/components/railways/railways-table.html',
			controller  : 'railwayController'
		})

		// route for the railways page.
		.when('/railways', {
			templateUrl : 'js/components/railways/railways-table.html',
			controller  : 'railwayController'
		})

		// route for the hospitals page.
		.when('/hospitals', {
			templateUrl : 'js/components/hospitals/hospitals-table.html',
			controller  : 'hospitalController'
		});
});

// Setting the pagination.
function pagination($scope, array){
	$scope.totalItems = array.length;
	$scope.currentPage = 1;
	$scope.itemsPerPage = 10;
	$scope.maxSize = 5;
	$scope.numPages = 8;
};