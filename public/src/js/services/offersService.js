'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.service:OffersService
 * @description
 * # companylistingCtrl
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.service('OffersService', ['OfferServiceREST', function (OfferServiceREST) {

    var service = {};

    service.get = function(id) {
        return OfferServiceREST.get(id);
    };

    service.delete = function(id) {
        return OfferServiceREST.delete(id);
    };

    service.getList = function() {
        return OfferServiceREST.getList();
    };

    service.getListOffersForCompany = function(id) {
        return OfferServiceREST.getListOffersForCompany(id);
    };

    service.filter = function(filter) {
        return OfferServiceREST.filter(filter);
    };

    service.saveNewOfferForUser = function(data) {
        return OfferServiceREST.saveNewOfferForUser(data);
    };

    service.save = function(data) {
        return OfferServiceREST.save(data);
    };

    return service;
}]);
