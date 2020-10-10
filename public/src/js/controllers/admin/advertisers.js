'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:Home
 * @description
 * # Home
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('AdvertisersCtrl', ['$scope', 'advertisers', '$state', 'AdministratorService',
function($scope, advertisers, $state, AdministratorService) {
    $scope.advertisers = advertisers;
    if($scope.advertisers == 'notloggedin'){
        $state.go('site.home');
    }

    $scope.delete = function(id){
        AdministratorService.deleteCompanies(id);
    };

}]);
