var app = angular.module('Freedom', ['ngResource', 'ngRoute']);

var config = ['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			// templateUrl: 'partials/comment-list.html',
			// controller: 'CommentCtrl'
			templateUrl: 'partials/user-form.html',
			controller: 'UserCtrl'
		})
		.when('/new', {
			templateUrl: 'partials/comment-form.html',
			controller: 'AddCommentCtrl'
		})
		.when('/edit/:id', {
			templateUrl: 'partials/comment-form.html',
			controller: 'EditCommentCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}];

app.config(config);

app.controller('CommentCtrl', ['$scope', '$resource', '$route', function($scope, $resource, $route){
	var api = $resource('/freedom');
	api.query(function(comments){
		$scope.comments = comments;
	});

	$scope.deleteComment = function(id){
		if(confirm('Delete Comment ?')){
			var api = $resource('/freedom/:id');
			api.delete( {id: id }, function(comment){
				$route.reload();
			});
		}
	}
}]);

app.controller('AddCommentCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location){
	$scope.saveComment = function(){
		var api = $resource('/freedom');
		api.save($scope.comment, function(){
			$location.path('/');
		});
	};
}]);

app.controller('EditCommentCtrl',
	['$scope', '$resource', '$routeParams', '$location',
		function($scope, $resource, $routeParams, $location){
			var api = $resource('/freedom/:id',
				{ id: '@_id' },
				{ update: {
					method: 'PUT'
				}});
			api.get({id: $routeParams.id}, function(comment){
				$scope.comment = comment;
			});

			$scope.saveComment = function(){
				api.update($scope.comment, function(){
					$location.path('/');
				});
			}
		}
	]
);

app.controller('UserCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location){
	var api = $resource('/users');
	$scope.saveUser = function(){
		api.save($scope.user, function(user){
			$location.path('/');
		});
	}
}]);