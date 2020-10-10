angular.module('ciaDasOfertaWebApp')
.factory('ConfigurationRESTService', ['$resource', function($resource){
    var service = {};

    service.getCategories = function(){
        return $resource('/category').query();
    };

    service.getStates = function(){
        return $resource('/state').query();
    };

    service.getCities = function(id){
        return $resource('/city/:id').query(id);
    };

    return service;
}]);
