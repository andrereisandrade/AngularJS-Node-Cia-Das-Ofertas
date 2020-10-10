'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:HomeDashboard
 * @description
 * # HomeDashboard
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('dashboard')

.controller('HomeDashboard', ['CompanyService', '$scope', '$filter', function(CompanyService, $scope, $filter) {

    $scope.contactList = [];

    $scope.loadPage = function (){
        CompanyService.query(
            function(company) {
                $scope.contactList = company;
            },
            function(erro) {
                console.log(erro)
            }
        );
    }
    
    $scope.loadPage();
}]);
