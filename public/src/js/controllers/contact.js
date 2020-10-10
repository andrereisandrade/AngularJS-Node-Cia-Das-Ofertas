'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:ContactController
 * @description
 * # ContactController
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.controller('ContactController', ['$scope', 'toastr', 'AdministratorService', 'dateFilter', function($scope, toastr, AdministratorService, dateFilter) {
    $scope.message = {};

    $scope.save = function(data) {
        data.date = dateFilter(new Date(),'yyyy-MM-dd');
        AdministratorService.save(data).$promise.then(function(resolve) {
            toastr.info('Mensagem enviado com sucesso');
        })
        .catch(function(erro) {
            toastr.error('Erro ao enviar Mensagem');
        });
    };
}]);
