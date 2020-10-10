'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:Home
* @description
* # Home
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')

.controller('Home', ['$scope', '$filter', 'companies', 'offers', 'configCarousel', 'ModalService', '$uibModal', '$log', 'SearchService', 'CompanyService', 'OfferServiceREST',
function ($scope, $filter, companies, offers, configCarousel, ModalService, $uibModal, $log, SearchService, CompanyService, OfferServiceREST) {

    $scope.offers = offers;
    $scope.offersSlider = false;
    $scope.carouselContent = false;
    $scope.isReadonly = false;
    $scope.rate = 2;
    $scope.max = 5;
    $scope.limit = 10;

    $scope.ratingStates = [
        {
            stateOn: 'glyphicon-star',
            stateOff: 'glyphicon-star-empty'
        },
    ];

    offers.$promise.then(function (offers){
        $scope.offersSlider = offers;
    });

    companies.$promise.then(function (companies){
        $scope.carouselContent = companies;
    });

    $scope.detail = function(offer) {
        var modalInstance = $uibModal.open({
            templateUrl: "views/site/company/modal/detailOffer.html",
            controller: "DetailOfferController",
            resolve: {
                offer: function() {
                    return offer;
                }
            }
        });
        modalInstance.result.then(function(response) {
            if(response != 'cancel'){
                $scope.getCoupon(response);
            }
        }, function() {
        });
    };

    $scope.getMoreOffers = function (){
        $scope.skip = $scope.limit;
        $scope.limit = $scope.skip + 4;
        // It will used in the future
//        SearchService.searchByLimit($scope.skip, $scope.limit).then(function (offers) {
//            //$scope.contactList.push.apply(offers);
//            Array.prototype.push.apply($scope.offers, offers);
//        });
    };
    
    $scope.getCoupon = function(offer) {
        var modalInstance = $uibModal.open({
            templateUrl: "views/site/company/modal/getCoupon.html",
            controller: "GetCouponController",
            resolve: {
                offer: function() {
                    return offer;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

}]);
