'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.service:CompanyService
 * @description
 * # companylistingCtrl
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.service('OfferServiceREST', ['$resource', '$q', function ($resource , $q) {
    var service = {};

    service.get = function(id) {
        var resource = $resource('/offer/:id');
        return resource.get(id);
    };

    service.delete = function(id) {
        var resource = $resource('/offer/:id');
        return resource.delete(id);
    };

    service.getList = function() {
        var resource = $resource('/offer/:id');
        return resource.query();
    };

    service.getListOffersForCompany = function(id) {
        var resource = $resource('/offer/company/:id');
        return resource.query(id);
    };

    service.saveNewOfferForUser = function(data) {
        var resource = $resource('/offer/:id');
        var deferred = $q.defer();
        var offer = new resource(data);

        offer.$save(null,function(response){
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.filter = function (filter){
        var deferred = $q.defer();

        var result =  $resource('/offers/category/:category/state/:state/city/:city', filter);

        result.query(
            function (offer) {
                deferred.resolve(offer);
            },
            function (erro) {
                deferred.reject(erro);
            }
        );
        return deferred.promise;
    };

    service.save = function(data) {
        return $resource('/offer/:id', {
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

    return service;
}]);
