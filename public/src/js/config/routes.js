'use strict';

angular.module('ciaDasOfertaWebApp')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $stateProvider
            .state('site', {
                templateUrl: 'views/site/site.html'
            })
            .state('site.home', {
                url: '/',
                templateUrl: 'views/site/home.html',
                controller: 'Home',
                resolve: {
                    companies: function (CompanyServiceREST) {
                        return CompanyServiceREST.getList();
                    },
                    offers: function (OfferServiceREST) {
                        return OfferServiceREST.getList();
                    },
                    configCarousel: function (ConfigurationService) {
                        return ConfigurationService.carouselResponsiveConfig();
                    }
                }
            })
            .state('site.ofertas', {
                url: '/ofertas',
                templateUrl: 'views/site/offers.html',
                controller: 'OffersController',
                resolve: {
                    companies: function (CompanyServiceREST) {
                        return CompanyServiceREST.getList();
                    },
                    offers: function (OfferServiceREST) {
                        return OfferServiceREST.getList();
                    },
                    categories: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getCategories();
                    },
                    states: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getStates();
                    }
                }
            })
            .state('site.contact', {
                url: '/contato',
                templateUrl: 'views/site/contact.html',
                controller: 'ContactController'
            })
            .state('site.advertisers', {
                url: '/anunciantes',
                templateUrl: 'views/site/company/companyList.html',
                controller: 'CompanyController',
                resolve: {
                    companies: function (CompanyServiceREST) {
                        return CompanyServiceREST.getList();
                    }
                }
            })
            .state('site.advertiser', {
                url: '/anunciante',
                templateUrl: 'views/site/company/company.html',
            })
            .state('site.advertiser.login', {
                url: '/login',
                templateUrl: 'views/site/company/login.html',
                controller: 'CompanyLogin',
                resolve: {
                    authenticatedCompany: function (AuthenticationService, $rootScope, $state) {
                        return AuthenticationService.fillAuthData();
                    }
                }
            })
            .state('site.advertiser.register', {
                url: '/cadastro',
                templateUrl: 'views/site/company/companyForm.html',
                controller: 'CompanyForm',
                resolve: {
                    categories: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getCategories();
                    },
                    states: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getStates();
                    }
                }
            })
            .state('site.advertiser.control', {
                url: '/controle',
                templateUrl: 'views/site/company/companyControl.html',
                controller: 'CompanyControl',
                resolve: {
                    categories: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getCategories();
                    },
                    company: function (AuthenticationService, CompanyService) {
                        return CompanyService.get({
                            id: AuthenticationService.fillAuthData().id
                        });
                    },
                    offers: function (AuthenticationService, OffersService) {
                        return OffersService.getListOffersForCompany({
                            id: AuthenticationService.fillAuthData().id
                        });
                    },
                    states: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getStates();
                    },
                    messages: function (CompanyServiceREST) {
                        return CompanyServiceREST.getMessages();
                    }
                }
            })
            .state('site.advertiserPage', {
                url: '/:companyName',
                templateUrl: 'views/site/company/detail.html',
                controller: 'CompanyDetailCtrol',
                params: {
                    id: null,
                    nameCompany: null
                },
                resolve: {
                    categories: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getCategories();
                    },
                    company: function ($stateParams, CompanyService) {
                        if ($stateParams.id) {
                            return CompanyService.get({
                                id: $stateParams.id
                            });
                        } else {
                            return null;
                            //$state.go('site.home');
                        }
                    },
                    offers: function ($stateParams, OffersService, $state) {
                        if ($stateParams.id) {
                            return OffersService.getListOffersForCompany({
                                id: $stateParams.id
                            });
                        } else {
                            return null;
                            //$state.go('site.home');
                        }
                    }
                }
            })
            // -----------  Dashboard Advertiser -------------//
            .state('dashboard', {
                templateUrl: 'views/dashboard/dashboard.html'
            })
            .state('dashboard.index', {
                url: '/dashboard/:advertiserName',
                templateUrl: 'views/site/company/companyControl.html',
                controller: 'CompanyControl',
                resolve: {
                    categories: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getCategories();
                    },
                    company: function (AuthenticationService, CompanyService) {
                        return CompanyService.get({
                            id: AuthenticationService.fillAuthData().id
                        });
                    },
                    offers: function (AuthenticationService, OffersService) {
                        return OffersService.getListOffersForCompany({
                            id: AuthenticationService.fillAuthData().id
                        });
                    },
                    states: function (ConfigurationRESTService) {
                        return ConfigurationRESTService.getStates();
                    },
                    messages: function (CompanyServiceREST) {
                        return CompanyServiceREST.getMessages();
                    }
                }
            })


// ------  ADMINISTRATION --------//
.state('login', {
    url: '/admin/login',
    templateUrl: 'views/dashboard/views/login.html',
    controller: 'AdministratorLoginCtrl'
})
.state('admin', {
    url: '/admin',
    templateUrl: 'views/dashboard/dashboard.html'
})
.state('admin.index', {
    url: '/dashboard',
    templateUrl: 'views/dashboard/index.html',
    controller: 'Home'
})
.state('admin.advertiser', {
    url: '/anunciante',
    templateUrl: 'views/dashboard/views/companies/advertiser.html',
})
.state('admin.advertisers', {
    url: '/anunciantes',
    templateUrl: 'views/dashboard/views/companies/advertisers.html',
    controller: 'AdvertisersCtrl',
    resolve: {
        advertisers: function (AdministratorService) {
            return AdministratorService.getCompanies();
        }
    }
})
.state('admin.users', {
    url: '/usuarios',
    templateUrl: 'views/dashboard/views/users/users.html',
    controller: 'UsersCtrl',
    resolve: {
        users: function (AdministratorService) {
            return AdministratorService.getUsers();
        }
    }
})
.state('admin.message', {
    url: '/mensagens',
    templateUrl: 'views/dashboard/views/messages/message.html'
})
.state('admin.message.company', {
    url: '/empresas',
    templateUrl: 'views/dashboard/views/messages/messageCompanies.html',
    controller: 'MessagesCompanyCtrl',
    resolve: {
        messages: function (AdministratorService) {
            return AdministratorService.getMessagesCompany();
        }
    }
})
.state('admin.message.users', {
    url: '/usuarios',
    templateUrl: 'views/dashboard/views/messages/messageUsers.html',
    controller: 'MessagesUsersCtrl',
    resolve: {
        messages: function (AdministratorService) {
            return AdministratorService.getMessagesUsers();
        }
    }
});


        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    });
