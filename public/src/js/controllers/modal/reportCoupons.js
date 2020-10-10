'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:ReportCoupons
* @description
* # ReportCoupons
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')
.controller('ReportCouponsCtrl', ['UserService', '$scope', 'offer', '$uibModalInstance',
function(UserService, $scope, offer, $uibModalInstance) {

    $scope.offer = offer;
    $scope.generationsCoupons = $scope.offer.generationsCoupons;

    $scope.set_color = function(utilized) {
        if (utilized == 'Não utilizado') {
            return {
                background: '#ffc9c9'
            };
        } else {
            return {
                background: '#dfffde'
            };
        }
    };

    $scope.close = function(){
        $uibModalInstance.close();
    };

    $scope.validate = function(data) {

    };

}]);
