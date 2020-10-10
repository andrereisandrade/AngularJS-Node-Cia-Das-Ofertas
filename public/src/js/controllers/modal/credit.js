'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:GetCouponController
 * @description
 * # GetCouponController
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('CreditModalCtrl', ['$scope', 'CompanyServiceREST', 'CompanyFormValidatorService','$uibModalInstance',  'company','toastr',
function($scope, CompanyServiceREST, CompanyFormValidatorService, $uibModalInstance, company, toastr) {

    $scope.company = company;
    $scope.credit = company.credit;
    $scope.company.category =  $scope.company.category._id;
   // $scope.company.state = $scope.company.state._id;

    $scope.confirm = function(company) {
        company.credit = parseInt(company.creditToAdd) + parseInt($scope.credit);
        var data = new FormData();
        for (var key in company)
            data.append(key, company[key]);
        CompanyServiceREST.save(data).$promise.then(function(resolve) {
            toastr.info('Obtido com sucesso!');
            $uibModalInstance.close();
        })
        .catch(function(erro) {
            toastr.error('Erro ao obter!');
            $uibModalInstance.close();
        });
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };
}]);
