'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:GetCouponController
* @description
* # GetCouponController
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')
.controller('DetailOfferController', ['$scope', 'offer', '$uibModalInstance',
function($scope, offer, $uibModalInstance) {

    $scope.offer = offer;

    $scope.close = function() {
        $uibModalInstance.close('cancel');
    };

    $scope.getCoupon = function(offer){
        $uibModalInstance.close(offer);
    };

}]);
