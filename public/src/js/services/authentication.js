angular.module('ciaDasOfertaWebApp')

.factory('AuthenticationService', ['AuthenticationRESTService', '$rootScope',  '$resource', 'localStorageService', 'ngAuthSettings', '$http', '$q',
function(AuthenticationRESTService, $rootScope,  $resource, localStorageService, ngAuthSettings, $http, $q) {

    var authServiceFactory = {};
    var _authentication = {
        token:'',
        id: '',
        isAuth: false,
        name: "",
        email: "",
        typeLogin: "",
        useRefreshTokens: false
    };

    authServiceFactory.fillAuthData = function() {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.id = authData.id;
            _authentication.name = authData.name;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.token = authData.token;
            return _authentication;
        }
    };

    authServiceFactory.companyLogin = function (loginData) {
        var deferred = $q.defer();
        AuthenticationRESTService.companyLogin(loginData)
        .then(function(response) {
            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationData', {
                    token: response.token,
                    id: response.company._id,
                    name: response.company.name,
                    refreshToken: response.useRefreshTokens,
                    useRefreshTokens: true
                });
            }
            else {
                localStorageService.set('authorizationData', {
                    token: response.token,
                    id: response.company._id,
                    name: response.company.name,
                    refreshToken: response.useRefreshTokens,
                    useRefreshTokens: false
                });
            }

            _authentication.isAuth = true;
            _authentication.name = response.company.name;
            _authentication.useRefreshTokens = true;
            _authentication.id = response.company.id;
            _authentication.token = response.token;

            deferred.resolve(response);
        })
        .catch(function(erro) {
            deferred.reject(erro);
        });
        return deferred.promise;
    };

    authServiceFactory.clientLogin = function(data) {
        var deferred = $q.defer();
        AuthenticationRESTService.login(data)
        .then(function(response) {
            deferred.resolve(response);
        })
        .catch(function(erro) {
            deferred.reject(erro);
        });
        return deferred.promise;
    };

    authServiceFactory.adminLogin = function (loginData) {
        var deferred = $q.defer();
        AuthenticationRESTService.login(loginData)
        .then(function(response) {

            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationData', {
                    token: response.token,
                    id: response.user._id,
                    name: response.user.username,
                    email: response.user.email,
                    typeLogin: response.user.permition,
                    refreshToken: response.useRefreshTokens,
                    useRefreshTokens: true
                });
            }
            else {
                localStorageService.set('authorizationData', {
                    token: response.token,
                    id: response.user._id,
                    name: response.user.username,
                    email: response.user.email,
                    typeLogin: response.user.permition,
                    refreshToken: response.useRefreshTokens,
                    useRefreshTokens: false
                });
            }

            _authentication.isAuth = true;
            _authentication.name = response.user.username;
            _authentication.email = response.user.email;
            _authentication.typeLogin = response.user.permition;
            _authentication.useRefreshTokens = true;
            _authentication.id = response.user.id;
            _authentication.token = response.token;
            deferred.resolve(response);
        })
        .catch(function(erro) {
            deferred.reject(erro);
        });
        return deferred.promise;
    };

    authServiceFactory.logout = function() {
        window.localStorage.clear();
    };

    return authServiceFactory;
}]);
