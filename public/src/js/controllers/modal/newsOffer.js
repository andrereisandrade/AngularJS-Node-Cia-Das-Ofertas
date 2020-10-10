'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:GetCouponController
 * @description
 * # GetCouponController
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('NewsOfferModalCtrl', ['$scope', 'OffersService', 'UserService','CompanyFormValidatorService', 'CompanyServiceREST','$uibModalInstance', 'dateFilter', 'toastr', 'company', 'offer','$filter',
function($scope, OffersService, UserService, CompanyFormValidatorService, CompanyServiceREST, $uibModalInstance, dateFilter, toastr, company, offer, $filter) {

    $scope.company = company;
    $scope.dateFinalPreviousSearch = {};

    if(!offer){
        $scope.offer = {
            company: $scope.company._id,
            nameCompany: $scope.company.name,
            credit: $scope.company.credit,
            dateOfExpiration: new Date(),
            creationDate: dateFilter(new Date(),'yyyy-MM-dd')
        };
    } else {
        $scope.offer = offer;
        $scope.offer.credit = $scope.company.credit;
    }

    $scope.uploader = {};
    $scope.imageStrings = [];

    $scope.save = function(form, offer) {
        offer.dateOfExpiration = $filter('date')(new Date(offer.dateOfExpiration), 'dd/MM/yyyy');
        offer.amountOfOffers = parseInt(offer.amountOfOffers);
        if(CompanyFormValidatorService.validOffer(form, offer)){
            var data = new FormData();
            for (var key in offer)
                data.append(key, offer[key]);
                OffersService.save(data).$promise.then(function() {
                $scope.company.credit = $scope.company.credit - $scope.offer.amountOfOffers;
                $scope.updateCompany($scope.company);
            })
            .catch(function(erro) {
                toastr.error('Erro ao Salvar Empresa');
                $uibModalInstance.close();
            });
        }
    };

    $scope.updateCompany = function(company){
        company.category =  company.category._id;
        var data = new FormData();
        for (var key in company)
            data.append(key, company[key]);
        CompanyServiceREST.save(data).$promise.then(function(resolve) {
            toastr.info('Salvo com sucesso');
            $uibModalInstance.close();
        })
        .catch(function(erro) {
            toastr.error('Erro ao Salvar Empresa');
            $uibModalInstance.close();
        });
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

    $scope.processFiles = function(files) {
        $scope.offer.file = files[0].file;
    };
}]);
