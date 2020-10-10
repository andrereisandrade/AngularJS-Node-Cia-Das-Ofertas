'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.service:CompanyService
 * @description
 * # companylistingCtrl
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.service('CompanyService', ['CompanyServiceREST', 'AuthenticationService',
function (CompanyServiceREST, AuthenticationService) {
    var service = {};
    var company = AuthenticationService.fillAuthData();

    service.get = function(id) {
        return CompanyServiceREST.get(id);
    };

    service.getList = function() {
        return CompanyServiceREST.getList();
    };

    service.getMessages = function() {
        return CompanyServiceREST.getMessages();
    };

    service.filter = function(filter) {
        return CompanyServiceREST.filter(filter);
    };

    service.save = function(data) {
        if(data._id){
            data.company = company;
            return CompanyServiceREST.update(data);
        }else{
            return CompanyServiceREST.save(data);
        }
    };

    return service;

}]);
