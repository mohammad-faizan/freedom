var app = angular.module('Freedom', ['ngResource', 'ngRoute']);

var config = ['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/comment-list.html',
			controller: 'CommentCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}];

app.config(config);

app.controller('CommentCtrl', ['$scope', '$resource', function($scope, $resource){
	var api = $resource('/freedom');
	api.query(function(comments){
		$scope.comments = comments;
	});
}]);