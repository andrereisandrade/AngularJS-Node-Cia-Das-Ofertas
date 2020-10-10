'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.service:UserService
 * @description
 * # UserService
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.service('UserService', ['UserServiceREST', function(UserServiceREST) {
    var service = {};
    service.getByEmail = function(email) {
        return UserServiceREST.getByEmail(email);
    };
    
    service.save = function(data) {
        return UserServiceREST.save(data);
    };

    //return $resource('/user/:id');
    return service;
}]);
