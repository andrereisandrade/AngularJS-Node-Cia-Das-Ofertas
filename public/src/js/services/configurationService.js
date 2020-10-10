angular.module('ciaDasOfertaWebApp')
.factory('ConfigurationService', ['$resource', function($resource){
    var service = {};

    service.carouselResponsiveConfig = function(){
        return  [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }];
    };

    return service;
}]);
