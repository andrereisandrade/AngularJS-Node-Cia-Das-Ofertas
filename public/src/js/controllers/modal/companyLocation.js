"use strict";

/**
* @ngdoc function
* @name ciaDasOfertaWebApp.controller:ShopsController
* @description
* # ShopsController
* Controller of the ciaDasOfertaWebApp
*/

angular.module('ciaDasOfertaWebApp')
.controller('newPlaceCtrl', function($scope, $interval, address) {
    $scope.map = {
        center: {
            latitude: -22.0665234,
            longitude: -45.54222140000002
        },
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    $scope.options = {
        scrollwheel: false
    };
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
        id: 0,
        coords: {
            latitude: -22.0665234,
            longitude: -45.54222140000002
        },
        options: {
            draggable: true
        },
        events: {
            dragend: function(marker, eventName, args) {
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "",
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };
    $scope.$watchCollection("marker.coords", function(newVal, oldVal) {
        $scope.map.center.latitude = $scope.marker.coords.latitude;
        $scope.map.center.longitude = $scope.marker.coords.longitude;
        if (_.isEqual(newVal, oldVal))
        return;
        $scope.coordsUpdates++;
    });

    $scope.showResult = function(result) {
        $scope.map.center.latitude = result.geometry.location.lat();
        $scope.marker.coords.latitude = result.geometry.location.lat();
        $scope.map.center.longitude = result.geometry.location.lng();
        $scope.marker.coords.longitude = result.geometry.location.lng();
    };

    $scope.getLatitudeLongitude = function(callback, address) {

        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[0]);
                }
            });
        }
    };

    $scope.getLatitudeLongitude($scope.showResult, address);

})
