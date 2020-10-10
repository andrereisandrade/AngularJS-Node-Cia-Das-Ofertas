'use strict';

angular.module('ciaDasOfertaWebApp')

.factory('AuthenticationRESTService', ['$resource', '$q',
 function($resource, $q) {

    var service = {};

    service.companyLogin = function(data) {
        var resource = $resource('company/login/:id');
        var deferred = $q.defer();
        var validateUser = new resource(data);

        validateUser.$save(null,function(response){
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.logoutCompany = function(loginData) {
        var resource = $resource('company/logout/:id');
        var deferred = $q.defer();
        var validateUser = new resource(loginData);

        validateUser.$save(null,function(response){
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.login = function(data) {
        var resource = $resource('login/:id');
        var deferred = $q.defer();
        var validateUser = new resource(data);

        validateUser.$save(null,function(response){
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.logout = function(loginData) {
        var resource = $resource('logout/:id');
        var deferred = $q.defer();
        var validateUser = new resource(loginData);

        validateUser.$save(null,function(response){
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    return service;
 }]);
