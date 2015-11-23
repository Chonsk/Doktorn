angular.module('testapp', [
  'ngRoute',
]).
config(function($routeProvider) {
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
})

.controller('homeCtrl', function($log) {
  $log.debug('Welcome to the testapp!');
})

.controller('registerCtrl', function($scope, $log) {
  $scope.submit = function(user) {
    $log.debug('submit: user = ', user);
  };
})

.directive('luhnCheck', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attributes, ngModel) {

      function luhnCheck(value) {
        ngModel.$setValidity('luhn-check', luhnChk(value));
        return value;
      }

      ngModel.$parsers.push(luhnCheck);
      ngModel.$formatters.push(luhnCheck);
    }

  };
});

var luhnChk = function(luhn) {
	if (luhn && luhn.length) {
	  var len = luhn.length,
	    mul = 0,
	    prodArr = [
	      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
	    ],
	    sum = 0;

	  while (len--) {
	    sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
	    mul ^= 1;
	  }

	  return sum % 10 === 0 && sum > 0;
	}
	return false; // empty luhn, return false (happens at initiation)
};
