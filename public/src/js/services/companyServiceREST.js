'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.service:CompanyService
* @description
* # companylistingCtrl
* service of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')

.service('CompanyServiceREST', ['$resource', '$q', 'AuthenticationService', function ($resource, $q, AuthenticationService) {
    var service = {};
    var user = AuthenticationService.fillAuthData();

    service.get = function(id) {
        var resource = $resource('/company/:id');
        return resource.get(id);
    };

    service.getList = function() {
        var resource = $resource('/company/:id');
        return resource.query();
    };

    service.save = function(data) {
        return $resource('/company/:id', {
            id: "@_id"
        }, {
            save: {
                method: 'POST',
                transformRequest: angular.indentity,
                headers: {
                    'Content-Type': undefined
                }
            }
        }).save(data);
    };

    service.update = function(data) {
        // TODO change for quest update
        console.log(data);
        return $resource('/company/update:id', {
            id: "@_id"
        }, {
            save: {
                method: 'POST',
                transformRequest: angular.indentity,
                headers: {
                    'Content-Type': undefined
                }
            }
        }).save(data);
    };

    service.search = function (text){
        var deferred = $q.defer();
        var result = $resource('/company/search/:text', {
            text: text
        });

        result.query(
            function (company) {
                deferred.resolve(company);
            },
            function (erro) {
                deferred.reject(erro);
            }
        );
        return deferred.promise;
    };

    service.searchByLimit = function (skip, limit){
        var deferred = $q.defer();
        var result = $resource('/company/skip/:skip/limit/:limit', {
            skip: skip,
            limit: limit
        });

        result.query(
            function (company) {
                deferred.resolve(company);
            },
            function (erro) {
                deferred.reject(erro);
            }
        );
        return deferred.promise;
    };

    service.getMessages = function(id){
        var result = $resource('/company/message/:id');
        return result.query();
    };

    service.sendMessage = function(data) {
        var resource = $resource('/company/message');
        return resource.save(data);
    };

    service.deleteMessages = function(id){
        var resource = $resource('/company/message');
        return resource.delete(id);
    };

    return service;
}]);
