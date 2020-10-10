'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.service:OffersService
* @description
* # AdministrationService
* service of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')

.service('AdministratorService', ['AdministratorServiceREST', 'AuthenticationService', function (AdministratorServiceREST, AuthenticationService) {

    var service = {};
    var user = AuthenticationService.fillAuthData();

    // ------------- Manager Company ---------------//

    service.getCompanies = function(id) {
        if(user !== undefined){
            return AdministratorServiceREST.getCompanies(user);
        } else {
            return 'notloggedin';
        }
    };

    service.deleteCompanies = function(id) {
        if(user !== undefined){
            return AdministratorServiceREST.delete(id, user);
        } else {
            return 'notloggedin';
        }
    };

    service.getMessagesCompany = function() {
        if(user !== undefined){
            return AdministratorServiceREST.getMessagesCompany(user);
        } else {
            return 'notloggedin';
        }
    };

    service.filterCompany= function(data) {
        if(user !== undefined){
            return AdministratorServiceREST.filterCompany(data, user);
        } else {
            return 'notloggedin';
        }
    };

    // -------------  Manage Users ---------------//

    service.getUsers = function() {
        if(user !== undefined){
            return AdministratorServiceREST.getUsers(user);
        } else {
            return 'notloggedin';
        }
    };

    service.getMessagesUsers = function() {
        if(user !== undefined){
            return AdministratorServiceREST.getMessagesUsers(user);
        } else {
            return 'notloggedin';
        }
    };

    service.deleteUsers = function(id) {
        if(user !== undefined){
            return AdministratorServiceREST.deleteUsers(id, user);
        } else {
            return 'notloggedin';
        }
    };

    service.filterUsers = function() {
        if(user !== undefined){
            return AdministratorServiceREST.filterUsers(user);
        } else {
            return 'notloggedin';
        }
    };

    return service;
}]);
