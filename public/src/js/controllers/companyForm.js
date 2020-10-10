'use strict';

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:CompanyForm
* @description
* # CompanyForm
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')
.controller('CompanyForm', ['$scope', '$rootScope', 'CompanyServiceREST', 'CompanyFormValidatorService', 'WorkflowService', 'ConfigurationRESTService', 'categories', 'states', 'SearchService', 'toastr', '$state',
function($scope, $rootScope, CompanyServiceREST, CompanyFormValidatorService, WorkflowService, ConfigurationRESTService, categories, states, SearchService, toastr, $state) {

    $scope.categoryList = categories;
    $scope.states = states;
    $scope.cities = [];
    $scope.uploader = {};
    $scope.imageStrings = [];
    $scope.company = {};
    $scope.acceptContract = false;
    $scope.cheked = true;

    /*** Tabs ***/
    $scope.tabs = [{
        id: "contract",
        name: 'Termo de compromisso',
        templateUrl: 'views/site/company/companyRegistration/contract.html',
        validateFormMethod: CompanyFormValidatorService.validFistPageForm
    },
    {
        id: "basic",
        name: 'Informações Básicas',
        templateUrl: 'views/site/company/companyRegistration/form.html',
        validateFormMethod: CompanyFormValidatorService.validSecondPageForm
    },
    {
        id: "formOfContact",
        name: 'Informações de Contato',
        templateUrl: 'views/site/company/companyRegistration/formOfContact.html',
        validateFormMethod: CompanyFormValidatorService.validThirdPageForm
    }];

    $scope.currentTab = $scope.tabs[0];
    $scope.changeTab = function (form, tab) {
        $scope.currentTab = WorkflowService.changeTab(tab, $scope.currentTab, $scope.tabs, form, $scope.company);
    };

    $scope.cancel = function (){
        $state.go('site.home');
    };

    $scope.submit = function(myForm, company) {
        $scope.valideIfExistCompany();
        if(CompanyFormValidatorService.validThirdPageForm(myForm, company) && $scope.cheked){
            company.credit = 0;
            var data = new FormData();
            for (var key in company)
            data.append(key, company[key]);
            CompanyServiceREST.save(data).$promise.then(function() {
                toastr.info('Cadastro realizado com sucesso!');
                $state.go('site.advertiser.control');
            })
            .catch(function(erro) {
                //$state.go('site.home');
                toastr.error('Erro ao cadastrar');
            });
        }
    };

    $scope.valideIfExistCompany = function(){
        SearchService.search($scope.company.name).then(function (companies) {
            if(companies.length > 0){
                $rootScope.showAlert('Este nome já está sendo utilizado, escolha outro!');
                $scope.cheked = false;
            }
        });
    };

    $scope.processFiles = function(files) {
        $scope.company.file = files[0].file;
    };

    $scope.searchCity =  function(state) {
        ConfigurationRESTService.getCities({
            id: state
        }).$promise.then(function(resolve) {
            $scope.cities =  resolve;
        });
    };
}]);
