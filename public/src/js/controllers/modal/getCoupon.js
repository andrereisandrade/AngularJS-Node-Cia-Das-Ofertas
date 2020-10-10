'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.controller:GetCouponController
 * @description
 * # GetCouponController
 * Controller of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')
    .controller('GetCouponController', ['$scope', 'UserService', 'AuthenticationService', 'OffersService', 'offer', '$uibModalInstance', 'dateFilter', 'toastr', 'Facebook',
function ($scope, UserService, AuthenticationService, OffersService, offer, $uibModalInstance, dateFilter, toastr, Facebook) {

            $scope.checked = false;
            $scope.user;
            $scope.offer = {
                _id: offer._id,
                generationsCoupons: {}
            };

            $scope.close = function () {
                $uibModalInstance.close();
            };

            $scope.loginFacebook = function () {
                Facebook.login(function (response) {
                    if (response.status == 'connected') {
                        $scope.me();
                    }
                }, {
                    'scope': 'email,public_profile'
                });
            };

            // Getting name and email from facebook API
            $scope.me = function () {
                Facebook.api('/me?fields=id,email,name', function (response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function () {
                        $scope.user = response;
                        UserService.getByEmail($scope.user.email).$promise.then(function (res) {
                            if (res._id) { // getting user
                                $scope.user = res;
                                $scope.setOfferObtained();
                                console.log(res);
                            } else { // Saving new user
                                var user = {
                                    "username": $scope.user.name,
                                    "email": $scope.user.email
                                };
                                UserService.save(user).$promise.then(function (res) {
                                    $scope.user = res.data;
                                    $scope.setOfferObtained();
                                    console.log(res);
                                }).catch(function (error) {
                                    console.log(error);
                                });
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    });
                });
            };

            $scope.setOfferObtained = function () {
                $scope.offer.saveCouponUser = true;
                $scope.offer.generationsCoupons.user_Id = $scope.user._id;
                $scope.offer.generationsCoupons.email = $scope.user.email;
                $scope.offer.generationsCoupons.date = dateFilter(new Date(), 'd/M/yy h:mm a');
                $scope.offer.generationsCoupons.number = Math.floor((Math.random() * 99999999) + 10000000);
                $scope.offer.generationsCoupons.utilized = 'Não utilizado';
                $scope.saveOffer();
            };

            $scope.login = function (user) {
                AuthenticationService.clientLogin(user).then(function (response) {
                        $scope.setOfferObtained();
                    })
                    .catch(function (error) {
                        toastr.error('Usuario ou senha Invalido!');
                    });
            };

            $scope.saveOffer = function () {
                $scope.checked = true;
                OffersService.saveNewOfferForUser($scope.offer)
                    .then(function (response) {
                        $scope.checked = true;
                    })
                    .catch(function (erro) {
                        toastr.error('Erro ao adquirir o cupom!');
                    });
            };

}
]);