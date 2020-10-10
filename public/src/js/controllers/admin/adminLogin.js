"use strict.";

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:LoginCompany
 * @description
 * # LoginAdmin
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('AdministratorLoginCtrl',
['CompanyService', 'AuthenticationService', '$scope', '$state', 'toastr',
function(CompanyService, AuthenticationService, $scope, $state, toastr) {

    $scope.user = {};

    $scope.login = function (data) {
        AuthenticationService.adminLogin(data)
        .then(function(response){
            $state.go('admin.index');
        })
        .catch( function(error){
            toastr.error('Usuario ou senha Invalido!');
        });
    };
}]);
