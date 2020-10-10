'use strict';

/**
 * @ngdoc function
 * @name ciaDasOfertaWebApp.filter:cutString
 * @description
 * # cutString
 * service of the ciaDasOfertaWebApp
 */

angular.module('ciaDasOfertaWebApp')

.filter('cutString', [function () {
    return function (input, maxChars) {
        if (input && input.split("").length > maxChars) {
            return input.substring(0, maxChars) + "...";
        }

        return input;
    };
}]);
