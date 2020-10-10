'use strict';

/**
* @ngdoc service
* @name nmsTemplatecliWebApp.CompanyFormValidatorService
* @description
* # CompanyFormValidatorService
* Factory in the nmsTemplatecliWebApp.
*/
angular.module('ciaDasOfertaWebApp')
.factory('CompanyFormValidatorService', ['$rootScope','SearchService',
function ($rootScope, SearchService) {

    var service = {};

    service.validFistPageForm = function(form, company) {
        if (form.checkbox.$error.required) {
            $rootScope.showAlert('Aceite o termo de compromisso para seguir!');
            return false;
        }
        return true;
    };

    service.validSecondPageForm = function(myForm, company) {

        if (myForm.nameCompany.$error.required) {
            $rootScope.showAlert('Nome da empresa é obrigatório!');
            return false;
        }
        if (myForm.nameCompany.$error.pattern) {
            $rootScope.showAlert('Nome da empresa Invalido!');
            return false;
        }
        if (myForm.username.$error.required) {
            $rootScope.showAlert('Nome de usuário é obrigatório!');
            return false;
        }
        if (myForm.username.$error.pattern) {
            $rootScope.showAlert('Nome de usuário Invalido!');
            return false;
        }
        if (myForm.password.$error.required) {
            $rootScope.showAlert('Senha é obrigatório!');
            return false;
        }
        if(myForm.password.$error.minlength){
            $rootScope.showAlert('Senha muito curta!');
            return false;
        }
        if( myForm.password.$error.maxlength){
            $rootScope.showAlert('Senha muito longa!');
            return false;
        }
        if(!myForm.password_c.$error.required && myForm.password_c.$error.noMatch && myForm.password.$dirty){
            $rootScope.showAlert('Confirmação da senha não coincidem!');
            return false;
        }
        if(!company.category){
            $rootScope.showAlert('Escolha uma categoria!');
            return false;
        }
        if (myForm.description.$error.required) {
            $rootScope.showAlert('Descrição é obrigatório!');
            return false;
        }

        return true;
    };

    service.validThirdPageForm = function(myForm, company) {
        if (myForm.$error.required) {
            $rootScope.showAlert('Formulário imcompleto!');
            return false;
        }
        return true;
    };

    service.validOffer = function(form, offer){
        if (form.name.$error.required) {
            $rootScope.showAlert('Nome da oferta é obrigatório!');
            return false;
        }
        if (form.name.$error.pattern) {
            $rootScope.showAlert('Nome da oferta Invalido!');
            return false;
        }
        if (form.description.$error.required) {
            $rootScope.showAlert('Descrição da oferta é obrigatório!');
            return false;
        }
        if (!offer.amountOfOffers){
            $rootScope.showAlert('Por favor, informe a quantidade de cupom!');
            return false;
        }
        if (offer.credit < offer.amountOfOffers){
            $rootScope.showAlert('Você não possui saldo suficiente para cadastrar essa quantidade de cupom, faça uma nova recarga!');
            return false;
        }
        return true;
    };

    return service;

}]);
