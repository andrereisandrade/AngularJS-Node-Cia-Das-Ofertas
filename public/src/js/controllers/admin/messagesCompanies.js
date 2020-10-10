'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:Home
 * @description
 * # Home
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.controller('MessagesCompanyCtrl', ['$scope', 'messages','$state',
function($scope, messages, $state) {
    $scope.messages = messages;
    if($scope.messages == 'notloggedin'){
        $state.go('site.home');
    }
}]);
