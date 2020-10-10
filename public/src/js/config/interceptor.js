angular.module('ciaDasOfertaWebApp')
    .constant('ngAuthSettings', {
        apiServiceBaseUri: 'http://localhost:5000',
        clientId: 'ngAuthApp'
    })

.config(function ($httpProvider, FacebookProvider) {
    var myAppId = '1139710582752727';

    FacebookProvider.init(myAppId);
    $httpProvider.interceptors.push('authInterceptorService');
})

.run(function (AuthenticationService, $rootScope, ngDialog) {
    AuthenticationService.fillAuthData();

    $rootScope.showAlert = function (mensage) {
        $rootScope.message = mensage;
        ngDialog.open({
            template: 'views/site/popups/alert.html',
            scope: $rootScope
        });
    };
});