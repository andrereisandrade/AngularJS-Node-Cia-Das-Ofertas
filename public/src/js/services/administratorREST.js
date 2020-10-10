'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.service:CompanyService
* @description
* # companylistingCtrl
* service of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')

.service('AdministratorServiceREST', ['$resource', 'AuthenticationService',
function ($resource, AuthenticationService) {
    var service = {};

    //---------- Manager Service Rest Company ---------------//

    var resource = $resource('/message/:id', null);

    service.getCompany = function(id, user) {
        var result = $resource('/admin/company/:token/id/:id', {
            token: user.token,
            id: id
        });
        return result.get(id);
    };

    service.getCompanies = function(user) {
        var result = $resource('/admin/company/:token', {
            token: user.token
        });
        return result.query();
    };

    service.deleteCompanies = function(id, user) {
        var result = $resource('/admin/company/:token/id/:id', {
            token: user.token,
            id: id
        });
        return result.delete(id);
    };

    service.getMessagesCompany = function(user){
        var result = $resource('/admin/company/message/:token', {
            token: user.token
        });
        return result.query();
    };

    //---------- Manager Service Rest Users  ---------------//


    service.getUser = function(id, user) {
        var result = $resource('/admin/user/:token/id/:id', {
            token: user.token,
            id: id
        });
        return result.get(id);
    };

    service.getUsers = function(user) {
        var result = $resource('/admin/user/:token', {
            token: user.token
        });
        return result.query();
    };

    service.deleteUser = function(id, user) {
        var result = $resource('/admin/user/:token/id/:id', {
            token: user.token,
            id: id
        });
        return result.delete(id);
    };

    service.getMessagesUsers = function(user) {
        var result = $resource('/admin/user/message/:token', {
            token: user.token
        });
        return result.query();
    };

    return service;
}]);
