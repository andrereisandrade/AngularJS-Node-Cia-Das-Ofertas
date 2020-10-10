'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.service:CompanyService
 * @description
 * # companylistingCtrl
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
.service('SearchService',
['CompanyServiceREST', function (CompanyServiceREST) {

    var factory = {};

    factory.search = function (text){
        return CompanyServiceREST.search(text);
    };

    factory.searchByLimit = function (skip, limit){
        return CompanyServiceREST.searchByLimit(skip, limit);
    };

    return factory;

}]);
