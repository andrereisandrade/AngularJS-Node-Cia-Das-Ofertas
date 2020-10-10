'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:Home
 * @description
 * # Home
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('UsersCtrl', ['$scope', 'users','$state',
function($scope, users, $state) {
    $scope.users = users;
    if($scope.users == 'notloggedin'){
        $state.go('site.home');
    }
}]);
