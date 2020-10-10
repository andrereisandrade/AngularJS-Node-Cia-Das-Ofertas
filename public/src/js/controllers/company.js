"use strict";

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:ShopsController
 * @description
 * # ShopsController
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.controller('CompanyController', ['CompanyService', 'companies', '$scope','$uibModal',
function (CompanyService, companies, $scope, $uibModal) {

    $scope.companies = companies;
    console.log($scope.companies);

    $scope.location = function(company) {
        var address = company.street+','+company.number+','+company.neighborhood+','+company.city;

        var modalInstance = $uibModal.open({
            templateUrl: "views/site/company/modal/locationCompany.html",
            controller: "newPlaceCtrl",
            size: 'lg',
            resolve: {
                address: function() {
                    //return
                    return address;
                }
            }
        });
        modalInstance.result.then(function(response) {

        }, function() {
        });
    };

}]);
