angular.module('testapp', [
	'ngRoute',
]).
config(function($routeProvider){
$routeProvider
  .when('/', {
  	templateUrl: 'views/home.html',
  	controller: 'homeCtrl',
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerCtrl',
  })
  .otherwise({
    redirectTo: '/'
  });
}).
controller('homeCtrl', function($log){
  $log.debug('Welcome to the testapp!');
}).
controller('registerCtrl', function($scope, $log){
	$scope.submit = function(user){
		$log.debug('submit: user = ', user);
	};
});