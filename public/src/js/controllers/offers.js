'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:OffersController
* @description
* # OffersController
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')

.controller('OffersController', ['CompanyService', 'ConfigurationRESTService', 'OffersService', 'companies', 'offers','categories', 'states', '$scope',
function (CompanyService, ConfigurationRESTService, OffersService, companies, offers, categories, states, $scope) {

    $scope.companies = companies;
    $scope.categories = categories;
    $scope.filterOffer = {
        category: ' ',
        state: ' ',
        city: ' '
    };
    $scope.states = states;
    $scope.offers = offers;
    $scope.cities = [];
    $scope.ratingStates = [{
        stateOn: 'glyphicon-star',
        stateOff: 'glyphicon-star-empty'
    }];

    $scope.rate = 2;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.selectCategory = function(category){
        $scope.filterOffer.category = category;
        $scope.filter($scope.filterOffer);
    };

    $scope.selectState = function(state){
        $scope.filterOffer.state = state;
        $scope.filter($scope.filterOffer);
        $scope.cities = ConfigurationRESTService.getCities({
            id: state
        }).$promise.then(function(resolve) {
            $scope.cities =  resolve;
        });
    };

    $scope.selectCity = function(city){
        $scope.filterOffer.city = city;
        $scope.filter($scope.filterOffer);
    };

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.filter = function(filterOffer){
        OffersService.filter(filterOffer).then(function(response) {
            $scope.filtrado = response;
        });
    };


}]);
