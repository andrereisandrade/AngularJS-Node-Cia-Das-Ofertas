'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.service:CompanyService
 * @description
 * # companylistingCtrl
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.service('UserServiceREST', ['$resource', function ($resource) {
    var service = {};

    service.getByEmail = function(email) {
        var resource = $resource('/user/email/' + email);
        return resource.get(email);
    };
    
    service.save = function(data) {
        var resource = $resource('/user');
        return resource.save(data);
    };
   

    return service;
}]);
