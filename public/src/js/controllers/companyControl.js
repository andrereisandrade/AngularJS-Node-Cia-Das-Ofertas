"use strict";

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:ReportCoupons
* @description
* # ReportCoupons
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')
.controller('CompanyControl',
['UserService', 'CompanyServiceREST', 'OffersService', 'AuthenticationService', 'CompanyFormValidatorService', 'ConfigurationRESTService', 'SearchService', '$scope', '$state', '$uibModal', '$log', 'toastr', '$window', 'company', 'offers', 'categories', 'states',
function(UserService, CompanyServiceREST, OffersService, AuthenticationService, CompanyFormValidatorService, ConfigurationRESTService, SearchService, $scope, $state,  $uibModal, $log, toastr, $window, company, offers, categories, states) {

    //$scope.user = new UserService();
    $scope.company = company;
    $scope.offers = offers;
    $scope.states = states;
    $scope.updateChecked = false;
    //$scope.messages = messages;


    /*** Tabs ***/
    $scope.tabs = [{
        id: "detailCompany",
        name: 'Detalhes da Empresa',
        templateUrl: 'views/site/company/CompanyControlPanel/companyDetail.html',
        //validateFormMethod: $scope.validFirstPageForm
    },
    {
        id: "reportCoupons",
        name: 'Ofertas',
        templateUrl: 'views/site/company/CompanyControlPanel/reportCoupons.html',
        //validateFormMethod: $scope.validSecondPageForm
    },
    {
        id: "creditBalance",
        name: 'Créditos',
        templateUrl: 'views/site/company/CompanyControlPanel/creditBalance.html',
        //validateFormMethod: $scope.validSecondPageForm
    },
    {
        id: "contact",
        name: 'Duvidas e Reclamações',
        templateUrl: 'views/site/company/CompanyControlPanel/contact.html',
        //validateFormMethod: $scope.validSecondPageForm
    },
    {
        id: "message",
        name: 'Mensagens',
        templateUrl: 'views/site/company/CompanyControlPanel/messages.html',
        //validateFormMethod: $scope.validSecondPageForm
    },
    {
        id: "exit",
        name: 'Sair',
        //validateFormMethod: $scope.validSecondPageForm
    }];

    $scope.currentTab = $scope.tabs[0];
    $scope.changeTab = function (tabs) {
        if(tabs.id === 'exit'){
            AuthenticationService.logout();
            $state.go('site.home');
        } else {
            $scope.loadeOffers();
            $scope.currentTab = tabs;
        }
    };

    // **** Detail Company ******/

    $scope.edit = function() {
        $scope.searchCity($scope.company.state._id);
        $scope.updateChecked = true;
    };

    $scope.cancel = function() {
        $scope.updateChecked = false;
    };

    $scope.searchCity =  function(state) {

        ConfigurationRESTService.getCities({
            id: state
        }).$promise.then(function(resolve) {
            $scope.cities =  resolve;
        });
    };

    $scope.submit = function(myForm, company) {
        company.state = $scope.company.state._id;
        company.category = $scope.company.category._id;
        if(CompanyFormValidatorService.validThirdPageForm(myForm, company)){
            var data = new FormData();
            for (var key in company)
            data.append(key, company[key]);
            CompanyServiceREST.save(data).$promise.then(function() {
                $window.location.reload();
                toastr.info('Salvo com sucesso');
            })
            .catch(function(erro) {
                toastr.error('Erro ao Salvar Empresa');
            });
        }
    };

    $scope.processFiles = function(files) {
        $scope.company.file = files[0].file;
    };

    //***** Report of coupons *******/

    $scope.offerModal = function(offer) {
        var modalInstance = $uibModal.open({
            templateUrl: "views/site/company/modal/newsOffer.html",
            controller: "NewsOfferModalCtrl",
            size: 'lg',
            resolve: {
                company: function() {
                    var company = $scope.company;
                    //company.state = $scope.company.state._id;
                    return company;
                },
                offer: function() {
                    return offer;
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            $state.go($state.current, {}, {reload: true});
        }, function() {
            $log.info('Oferta não foi salva');
        });
    };

    $scope.loadeOffers = function(){
        OffersService.getListOffersForCompany({
            id: company._id
        }).$promise.then(function(resolve) {
            $scope.offers =  resolve;
        });
    };

    $scope.detailCoupon = function(offer) {
        var modalInstance = $uibModal.open({
            templateUrl: "views/site/company/modal/reportCoupon.html",
            controller: "ReportCouponsCtrl",
            size: 'lg',
            resolve: {
                offer: function() {
                    return offer;
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Oferta não foi salva');
        });
    };

    $scope.deleteOffer = function(offer) {
        OffersService.delete({
            id: offer
        }).$promise.then(function(resolve) {
            toastr.info('Deletado com Sucesso');
            $window.location.reload();
        });
    };

    //***** Credit Balance *******/

    $scope.addCredit = function() {
        var modalInstance = $uibModal.open({
            templateUrl: "views/site/company/modal/credit.html",
            controller: "CreditModalCtrl",
            resolve: {
                company: function() {
                    return $scope.company;
                },
            }
        });
        modalInstance.result.then(function() {
            $state.go($state.current, {}, {reload: true});
        }, function() {
        });
    };

    //***** Logout *******/

    $scope.logout = function(){
        AuthenticationService.logout();
    };

}]);
