var app = angular.module('Freedom', ['ngResource', 'ngRoute']);

var config = ['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/comment-list.html',
			controller: 'CommentCtrl'
		})
		.when('/new', {
			templateUrl: 'partials/comment-form.html',
			controller: 'AddCommentCtrl'
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

app.controller('AddCommentCtrl', ['$scope', '$resource', function($scope, $resource){
	$scope.saveComment = function(){
		
	};
}]);