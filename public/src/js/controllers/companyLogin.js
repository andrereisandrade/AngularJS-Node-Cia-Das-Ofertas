"use strict.";

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:LoginCompany
 * @description
 * # LoginCompany
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('CompanyLogin',
['CompanyService', 'AuthenticationService', '$scope', '$state', 'authenticatedCompany','toastr',
function(CompanyService, AuthenticationService, $scope, $state,authenticatedCompany, toastr) {

    $scope.companyAuth = authenticatedCompany;
    $scope.data = {};

    if($scope.companyAuth && $scope.companyAuth.id){
        $state.go('site.advertiser.control');
    }

    $scope.login = function (data) {

        AuthenticationService.companyLogin(data)
        .then(function(response){
            console.log("passou");
            $state.go('site.advertiser.control');
        })
        .catch( function(error){
            console.log("erro");
            toastr.error('Usuario ou senha Invalido!');
        });
    };

}]);
