"use strict.";

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:LoginCompany
 * @description
 * # LoginAdmin
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('MenuAdminCtrl',
['CompanyService', 'AuthenticationService', '$scope', '$state', 'toastr',
function(CompanyService, AuthenticationService, $scope, $state, toastr) {

    $scope.user = AuthenticationService.fillAuthData();

    console.log($scope.user);

    $scope.logout = function () {
        AuthenticationService.logout();
        $state.go('site.home');
    };
}]);
