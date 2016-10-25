// Calling an already existing module from app.js
var app = angular.module('techAssessmentApp');

// Initializing variables.
var distanceInput = '10',
	postcodeInput = 'GU314HT',
	railwayApiUrl = 'https://data.gov.uk/data/api/service/transport/naptan_railway_stations/postcode?postcode='
		+ postcodeInput + '&distance=' + distanceInput,
	railwayArray = [],
	userSearch = '',
	currentApiUrlCall = '',
	currentUserSearch = '';

// Setting the controller.
app.controller('railwayController',
	['$scope', '$http', function ($scope, $http) {

		// Initializing the first default return of data.
		railwayUpdate($scope);
		getApiData($scope, $http, railwayApiUrl);

		$scope.callData = function () {
			railwayUpdate($scope);
			if(currentApiUrlCall !== railwayApiUrl || userSearch !== currentUserSearch) {
				getApiData($scope, $http, railwayApiUrl);
			}
		}
	}]);

function railwayUpdate($scope) {
	// Updating distance input variable to be applied to the API URL call.
	$scope.distanceInput = {
		distanceUserInput: function (distanceInputUpdated) {
			return arguments.length ? (distanceInput = distanceInputUpdated) : distanceInput;
			;
		}
	}

	// Updating postInput variable to be applied to the API URL call.
	$scope.postcodeInput = {
		postcodeUserInput: function (postcodeInputUpdated) {
			return arguments.length ? (postcodeInput = postcodeInputUpdated) : postcodeInput;
		}
	}

	// Getting search query from user.
	$scope.userSearch = {
		searchUserInput: function (searchUserInputRequested) {
			return arguments.length ? (userSearch = searchUserInputRequested) : userSearch;
		}
	}

	// Updating the URL for the api call.
	railwayApiUrl = 'https://data.gov.uk/data/api/service/transport/naptan_railway_stations/postcode?postcode='
		+ postcodeInput + '&distance=' + distanceInput;
}

function getApiData($scope, $http, url) {
	// Updating variables for validation to save unnecessary requests.
	currentApiUrlCall = railwayApiUrl;
	currentUserSearch = userSearch;

	// API Request using url parameter.
	$http.get(url).then(function (response) {
		var dataReturnedArray = [];
		dataReturnedArray = response.data.result;
		railwayArray = [];
		// Checking if the response data is not an empty Array.
		if (dataReturnedArray !== undefined) {


			// Iterating through dataReturnedArray and creating objects for wanted data from initial return.
			for (i = 0; i < dataReturnedArray.length; i++) {
				var stationName = dataReturnedArray[i].stationname;
				var distance = (dataReturnedArray[i].distance / 1000).toFixed(1);
				var tiplocCode = dataReturnedArray[i].tiploccode;
				var atcoCode = dataReturnedArray[i].atcocode;

				// Setting searchMatches to false on each iteration;
				var searchMatches = false;

				userSearch.toLowerCase();

				// Searching strings to match user search;
				if (stationName.toLowerCase().search(userSearch) > -1) {
					searchMatches = true;
				} else if (distance.toString().toLowerCase().search(userSearch) > -1) {
					searchMatches = true;
				} else if (tiplocCode.toLowerCase().search(userSearch) > -1) {
					searchMatches = true;
				} else if (atcoCode.toLowerCase().search(userSearch) > -1) {
					searchMatches = true;
				}

				if(searchMatches) {

					// Creating and placing the objects into the railwayArray.
					railwayArray.push({
						stationname: stationName,
						distance: distance,
						tiploccode: tiplocCode,
						atcocode: atcoCode
					});
				}
			}

			// Calling the pagination function to apply pagination to the result of the API call.
			pagination($scope, railwayArray);
		}

		// Binding the railwayArray to the HTML.
		$scope.railways = railwayArray;
	}, function (response) { // This will be called if an error occurs.
		console.log("Error status, failed to retrieve!")
	})
};