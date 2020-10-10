'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:MenuController
* @description
* # MenuController
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')
.controller('MenuController', ['SearchService', 'ConfigurationRESTService','$scope', '$timeout', '$document',
function (SearchService,ConfigurationRESTService, $scope, $timeout, $document) {

    $scope.search = {};
    $scope.categories = {};

    $scope.getCategories = function(){
        $scope.categories = ConfigurationRESTService.getCategories();
    };

    $scope.getSearch = function () {
        if ($scope.search.text.length) {
            $('#icon-loading').show();
            $('#icon-search').hide();
            SearchService.search($scope.search.text).then(function (companies) {
                $timeout(function () {
                    $scope.search.result = companies;
                    $('#icon-loading').hide();
                    $('#icon-search').show();
                }, 200)

            }).catch(function () {
                $('#icon-loading').hide();
                $('#icon-search').show();
            });
        }

    };

    $document.on('click', function (event) {

        if (!$(event.target).hasClass('box-result-search') && !$(event.target).hasClass('input-text-search') && !$(event.target).hasClass('bt-search')) {

            $scope.$apply(function () {
                $scope.search.focus = false;
            });
        }
    });

    $scope.getCategories();
}]);
