'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:CompanyDetail
 * @description
 * # CompanyDetail
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('CompanyDetailCtrol', ['$scope', '$state', '$uibModal', 'CompanyService', 'OffersService', 'categories', 'company','offers',
function($scope, $state, $uibModal,CompanyService, OffersService, categories, company, offers) {

    if(!company){
        $state.go('site.home');
    }
    $scope.updateChecked = false;
    $scope.company = company;
    $scope.offers = offers || {};
    $scope.rate = 2;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.ratingStates = [
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
    ];

    $scope.releaseUpdate = function() {
        $scope.updateChecked = true;
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
        });
    };

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

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };



}]);
